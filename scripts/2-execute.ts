const hre = require("hardhat");
import dotenv from 'dotenv';

dotenv.config();

const FACTORY_NONCE = process.env.FACTORY_NONCE;
const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
const ENTRYPOINT_ADDRESS = process.env.ENTRYPOINT_ADDRESS;
const PAYMASTER_ADDRESS = process.env.PAYMASTER_ADDRESS;

async function main() {
  const entryPoint = await hre.ethers.getContractAt("EntryPoint", ENTRYPOINT_ADDRESS);  

  const sender = hre.ethers.getCreateAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE
  });

  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");

  const [signer0] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();

  const initCode = "0x";
  console.log("InitCode: ", initCode);
  console.log("Sender: ", sender);

  const Account = await hre.ethers.getContractFactory("Account");

  await entryPoint.depositTo(PAYMASTER_ADDRESS, { 
    value: hre.ethers.parseEther("200"), 
  });
  

  const userOps = {
    sender,
    nonce: await entryPoint.getNonce(sender, 0),
    initCode,
    callData: Account.interface.encodeFunctionData("execute"),
    callGasLimit: 200_000,
    verificationGasLimit: 200_000,
    preVerificationGas: 50_000,
    maxFeePerGas: hre.ethers.parseUnits("100", "gwei"),
    maxPriorityFeePerGas: hre.ethers.parseUnits("50", "gwei"),
    paymasterAndData: PAYMASTER_ADDRESS,
    signature: "0x",
  };

  console.log("EntryPoint NONCE: ", await entryPoint.getNonce(sender, 0),);

  const tx = await entryPoint.handleOps([userOps], address0);
  const receipt = await tx.wait();
  console.log(receipt);

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});