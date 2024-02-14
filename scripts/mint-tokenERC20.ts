const hre = require("hardhat");
import dotenv from 'dotenv';

dotenv.config();

const TOKENERC20_ADDRESS = process.env.TOKENERC20_ADDRESS;
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;

async function mintMain() {
    const tokenERC20 = await hre.ethers.getContractAt("TokenERC20", TOKENERC20_ADDRESS);
    

    await tokenERC20.mint(RECIPIENT_ADDRESS, "1000");

    console.log("Minted 1000 tokens to", RECIPIENT_ADDRESS);
}

mintMain().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });