const hre = require("hardhat");

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ENTRYPOINT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
  const entryPoint = await hre.ethers.getContractAt("EntryPoint", ENTRYPOINT_ADDRESS);  

  const sender = hre.ethers.getCreateAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE
  });

  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");

  const [signer0] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();

  const initCode = 
  FACTORY_ADDRESS +
  AccountFactory.interface
    .encodeFunctionData("createAccount", [address0])
    .slice(2);

  console.log("InitCode: ", initCode);

  const Account = await hre.ethers.getContractFactory("Account");

  
  await entryPoint.depositTo(sender, { 
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
    paymasterAndData: "0x",
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