# NFT Collection Project (ERC-721)
This repository contains a robust, gas-optimized ERC-721 smart contract collection built with Hardhat.

## Features
- **Strict Access Control:** Only the owner can mint new NFTs.
- **Metadata Management:** Supports dynamic/centralized URI for NFT metadata.
- **Dockerized Environment:** Fully automated testing suite.

## How to Run
To evaluate this project without installing dependencies locally, use Docker:

1. **Build the image:**
   \docker build -t nft-project .\

2. **Run the tests:**
   \docker run nft-project\

The tests verify contract deployment, minting permissions, and URI correctness.
