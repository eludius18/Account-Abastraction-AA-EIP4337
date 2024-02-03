import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const entryPoint = await ethers.getContractFactory("EntryPoint");
  const entryPointInstance = await entryPoint.deploy();

  // Wait for the contract to be deployed
  await entryPointInstance.deployed();

  // The address the Contract WILL have once mined
  console.log("EntryPoint deployed to:", entryPointInstance.address);

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});