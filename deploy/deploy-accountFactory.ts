import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const accountFactory = await ethers.getContractFactory("AccountFactory");
  const accountFactoryInstance = await accountFactory.deploy();

  // Wait for the contract to be deployed
  await accountFactoryInstance.deployed();

  // The address the Contract WILL have once mined
  console.log("Account Factory deployed to:", accountFactoryInstance.address);

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});