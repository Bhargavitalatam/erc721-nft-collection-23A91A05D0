import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTCollection", function () {
  let NFT, nft, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    NFT = await ethers.getContractFactory("NFTCollection");
    nft = await NFT.deploy("MyNFT", "MNFT", 5, "https://example.com/metadata/");
    await nft.deployed();
  });

  it("Should mint NFT correctly", async function () {
    await nft.mint(addr1.address);
    expect(await nft.totalMinted()).to.equal(1);
    expect(await nft.ownerOf(1)).to.equal(addr1.address);
    expect(await nft.tokenURI(1)).to.equal("https://example.com/metadata/1.json");
  });

  it("Should not mint more than max supply", async function () {
    for (let i = 0; i < 5; i++) {
      await nft.mint(owner.address);
    }
    await expect(nft.mint(owner.address)).to.be.revertedWith("Max supply reached");
  });

  it("Should only allow owner to mint", async function () {
    await expect(nft.connect(addr1).mint(addr1.address)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });
});
