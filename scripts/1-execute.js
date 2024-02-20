const hre = require("hardhat");
const ethers = require("ethers");
require("dotenv").config();

const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
const ENTRYPOINT_ADDRESS = process.env.ENTRYPOINT_ADDRESS;
const PAYMASTER_ADDRESS = process.env.PAYMASTER_ADDRESS;
const TOKENERC20_ADDRESS = process.env.TOKENERC20_ADDRESS;

async function main() {
  
  const [signer0] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();

  const entryPoint = await hre.ethers.getContractAt("EntryPoint", ENTRYPOINT_ADDRESS);
  const tokenerc20 = await hre.ethers.getContractAt("TokenERC20", TOKENERC20_ADDRESS);
  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");

  let initCode =
    FACTORY_ADDRESS +
    AccountFactory.interface
      .encodeFunctionData("createAccount", [address0])
      .slice(2);
  let sender;
  try {
    await entryPoint.getSenderAddress(initCode);
  } catch (e) {
    sender = "0x" + e.data.slice(-40);
  }
  console.log(`Sender Address: ${sender}`);

  const code = await hre.ethers.provider.getCode(sender);
  if (code !== "0x") {
    initCode = "0x";
  }

  const account = await hre.ethers.getContractFactory("Account");

  const tokenSupportedMultiDelegateCallData = [];
  const tokenItf = tokenerc20.interface;
  tokenSupportedMultiDelegateCallData.push(
    tokenItf.encodeFunctionData('transfer', [
      "0x8aD6e64723DCb6d8cBd3Ed285E5b234184D222A5",
      ethers.parseEther("0"),
    ]),
    tokenItf.encodeFunctionData('transfer', [
      "0x8aD6e64723DCb6d8cBd3Ed285E5b234184D222A5",
      ethers.parseEther("0"),
    ]),
    tokenItf.encodeFunctionData('transfer', [
      "0x8aD6e64723DCb6d8cBd3Ed285E5b234184D222A5",
      ethers.parseEther("0"),
    ]),
    tokenItf.encodeFunctionData('transfer', [
      "0x8aD6e64723DCb6d8cBd3Ed285E5b234184D222A5",
      ethers.parseEther("0"),
    ]),
    tokenItf.encodeFunctionData('transfer', [
      "0x8aD6e64723DCb6d8cBd3Ed285E5b234184D222A5",
      ethers.parseEther("0"),
    ])
  );

  console.log("Token Supported Multi Delegate Call Data: ", tokenSupportedMultiDelegateCallData);

  const callData = account.interface.encodeFunctionData("execute",[tokenSupportedMultiDelegateCallData]);

  const userOp = {
    sender,
    nonce: "0x" + (await entryPoint.getNonce(sender, 0)).toString(16),
    initCode,
    callData,
    paymasterAndData: PAYMASTER_ADDRESS,
    signature:
      "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
  };

  const { preVerificationGas, verificationGasLimit, callGasLimit } =
    await hre.ethers.provider.send("eth_estimateUserOperationGas", [
      userOp,
      ENTRYPOINT_ADDRESS,
    ]);
  

  const { maxFeePerGas } = await hre.ethers.provider.getFeeData();

  const maxPriorityFeePerGas = await hre.ethers.provider.send(
    "rundler_maxPriorityFeePerGas"
  );

  userOp.preVerificationGas = preVerificationGas;
  userOp.verificationGasLimit = verificationGasLimit;
  userOp.callGasLimit = callGasLimit;
  userOp.maxFeePerGas = "0x" + maxFeePerGas.toString(16);
  userOp.maxPriorityFeePerGas = maxPriorityFeePerGas;

  const userOpHash = await entryPoint.getUserOpHash(userOp);
  userOp.signature = await signer0.signMessage(hre.ethers.getBytes(userOpHash));

  const opHash = await hre.ethers.provider.send("eth_sendUserOperation", [
    userOp,
    ENTRYPOINT_ADDRESS,
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