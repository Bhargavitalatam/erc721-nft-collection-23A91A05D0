import { expect } from "chai";
import hre from "hardhat";
import { getAddress } from "viem";

describe("NFTCollection", function () {
  async function deployFixture() {
    const walletClients = await hre.viem.getWalletClients();
    const owner = walletClients[0];
    const otherAccount = walletClients[1];
    
    const nft = await hre.viem.deployContract("NFTCollection");
    return { nft, owner, otherAccount };
  }

  it("Should set the right owner", async function () {
    const { nft, owner } = await deployFixture();
    const contractOwner = await nft.read.owner();
    expect(getAddress(contractOwner)).to.equal(getAddress(owner.account.address));
  });

  it("Should allow owner to mint", async function () {
    const { nft, owner } = await deployFixture();
    await nft.write.mint([owner.account.address]);
    const balance = await nft.read.balanceOf([owner.account.address]);
    expect(balance).to.equal(1n);
  });

  it("Should fail if non-owner tries to mint", async function () {
    const { nft, otherAccount } = await deployFixture();
    
    // We explicitly use a try/catch block to prove the rejection happens
    let errorThrown = false;
    try {
      await nft.write.mint([otherAccount.account.address], {
        account: otherAccount.account,
      });
    } catch (error) {
      errorThrown = true;
    }

    expect(errorThrown).to.equal(true, "The transaction should have been rejected");
  });
});