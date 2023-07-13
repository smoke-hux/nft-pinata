// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("dotenv").config({path: ".env"});

async function main() {

  // here we are going to use the url from pinata for the IPFS  metadata
  const metadataURL = "ipfs://QmWCPuXE3jRg2GNnqrnkHLj7HXXEq8mBgMubehjpQVr4Cm/";
  // deploy contract in ethers.hs is an abstraction used to new smart contracts.
  // so smokenft here is a factory for the instances

  const smokenftcontract = await hre.ethers.deployContract("Smokenft", [metadataURL]);
    
  await smokenftcontract.waitForDeployment();

  // print the address of the deplyed contract

  console.log("Smokenft deployed to:", smokenftcontract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
