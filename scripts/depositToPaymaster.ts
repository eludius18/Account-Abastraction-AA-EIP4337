const hre = require("hardhat");
import dotenv from 'dotenv';

dotenv.config();

const ENTRYPOINT_ADDRESS = process.env.ENTRYPOINT_ADDRESS;
const PAYMASTER_ADDRESS = process.env.PAYMASTER_ADDRESS;

async function depositToPaymaster() {
    /* const entryPoint = await hre.ethers.getContractAt("EntryPoint", ENTRYPOINT_ADDRESS);

    await entryPoint.depositTo(PAYMASTER_ADDRESS, { 
        value: hre.ethers.parseEther(".1"), 
    });

    console.log("Deposit to Paymaster was succesfull!"); */

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: ["0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"],
    });
}

depositToPaymaster().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });