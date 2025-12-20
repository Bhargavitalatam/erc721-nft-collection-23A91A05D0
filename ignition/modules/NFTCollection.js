import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("NFTCollectionModule", (m) => {
  const nft = m.contract("NFTCollection");

  return { nft };
});