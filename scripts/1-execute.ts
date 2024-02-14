const hre = require("hardhat");
import dotenv from 'dotenv';


dotenv.config();

const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
const ENTRYPOINT_ADDRESS = process.env.ENTRYPOINT_ADDRESS;
const PAYMASTER_ADDRESS = process.env.PAYMASTER_ADDRESS;

async function main() {
  const entryPoint = await hre.ethers.getContractAt("EntryPoint", ENTRYPOINT_ADDRESS);
  
  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");

  const [signer0, signer1] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();

  let initCode = 
  FACTORY_ADDRESS +
  AccountFactory.interface
    .encodeFunctionData("createAccount", [address0])
    .slice(2);
  
  let sender
  try {
    await entryPoint.getSenderAddress(initCode);  
  } catch (e: any) {
    sender = "0x" + e.data.slice(-40);
  }

  console.log({ initCode });

  const code = await hre.ethers.provider.getCode(sender);
  console.log({ code });
  if (code !== "0x") {
    initCode = "0x";
  }

  console.log({ sender });
  
  const Account = await hre.ethers.getContractFactory("Account");

  type UserOp = {
    sender: string | undefined;
    nonce: string;
    callGasLimit: any | string;
    verificationGasLimit: any;
    preVerificationGas: any;
    maxPriorityFeePerGas: any;
    maxFeePerGas: any;
    initCode: any;
    callData: any;
    paymasterAndData: string | undefined;
    signature: string;
  };

  const userOp: UserOp = {
    sender,
    nonce: "0x" + (await entryPoint.getNonce(sender, 0)).toString(16),
    initCode: "0x",
    callData: Account.interface.encodeFunctionData("execute"),
    callGasLimit: undefined,
    verificationGasLimit: undefined,
    preVerificationGas: undefined,
    maxFeePerGas: undefined,
    maxPriorityFeePerGas: undefined,
    paymasterAndData: PAYMASTER_ADDRESS,
    signature: 
      "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c"
  };

  const { preVerificationGas, verificationGasLimit, callGasLimit } =
    await hre.ethers.provider.send("eth_estimateUserOperationGas", [
      userOp,
      ENTRYPOINT_ADDRESS,
    ]);

  userOp.preVerificationGas = preVerificationGas;
  userOp.verificationGasLimit = verificationGasLimit;
  userOp.callGasLimit = callGasLimit;

  const { maxFeePerGas } = await hre.ethers.provider.getFeeData();
  userOp.maxFeePerGas = "0x" + maxFeePerGas.toString(16);

  const maxPriorityFeePerGas = await hre.ethers.provider.send(
    "rundler_maxPriorityFeePerGas"
  );

  userOp.maxPriorityFeePerGas = maxPriorityFeePerGas;

  const userOpsHash = await entryPoint.getUserOpHash(userOp);
  userOp.signature = await signer0.signMessage(hre.ethers.getBytes(userOpsHash));

  const opHash = await hre.ethers.provider.send(
    "eth_sendUserOperation", [
    userOp, 
    ENTRYPOINT_ADDRESS
  ]);

  setTimeout(async () => {
    const { transactionHash } = await hre.ethers.provider.send(
      "eth_getUserOperationByHash",
      [opHash]
    );
  
    console.log(transactionHash);
  }, 5000);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});