const hre = require("hardhat");
import dotenv from 'dotenv';

dotenv.config();

const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;


async function balanceMain() {
    const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDRESS);
    const data = await account.getExecuteData();
    console.log("Data: ", data);


}

balanceMain().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });