const hre = require("hardhat");
import dotenv from 'dotenv';

dotenv.config();

const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;
const ENTRYPOINT_ADDRESS = process.env.ENTRYPOINT_ADDRESS;
const PAYMASTER_ADDRESS = process.env.PAYMASTER_ADDRESS;

async function balanceMain() {
    const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDRESS);
    const count = await account.count();
    console.log("Count: ", count);

    console.log("Account balance: ", 
    await hre.ethers.provider.getBalance(ACCOUNT_ADDRESS)
    );
    const entryPoint = await hre.ethers.getContractAt("EntryPoint", ENTRYPOINT_ADDRESS);
    console.log("Account balance on EntryPoint: ", await entryPoint.balanceOf(ACCOUNT_ADDRESS));
    console.log("Paymaster balance on EntryPoint: ", await entryPoint.balanceOf(PAYMASTER_ADDRESS));
}

balanceMain().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });