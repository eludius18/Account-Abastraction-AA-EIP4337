const hardhat = require("hardhat");

const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;

async function nonceMain() {
    const account = await hardhat.ethers.getContractAt("Account", ACCOUNT_ADDRESS);
    const count = await account.count();
    console.log("Count: ", count);
}

nonceMain().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });