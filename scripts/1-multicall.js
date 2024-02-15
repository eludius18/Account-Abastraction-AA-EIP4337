require("dotenv").config();

const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
const ENTRYPOINT_ADDRESS = process.env.ENTRYPOINT_ADDRESS;
const TOKENERC20_ADDRESS = process.env.TOKENERC20_ADDRESS;
const MULTICALL_ADDRESS = process.env.MULTICALL_ADDRESS;
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;

async function main() {
  const hre = require("hardhat");
  const [signer0, signer1] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();

  const entryPoint = await hre.ethers.getContractAt("EntryPoint", ENTRYPOINT_ADDRESS);
  const tokenerc20 = await hre.ethers.getContractAt("TokenERC20", TOKENERC20_ADDRESS);

  const multicall = await hre.ethers.getContractAt("Multicall", MULTICALL_ADDRESS);

  const pairAddresses = [ENTRYPOINT_ADDRESS];
  const pairLength = 1;

  const callDataArray = [];
  for (let pairId = 0; pairId < pairLength; pairId++) {
    console.log(`pairAddresses[${pairId}]: ${pairAddresses[pairId]}`);
    callDataArray.push(tokenerc20.transfer(ENTRYPOINT_ADDRESS, 100000));
    callDataArray.push(tokenerc20.transfer(ENTRYPOINT_ADDRESS, 200000));
  }

  const tx = await multicall.multicall(callDataArray);
  await tx.wait();
  console.log(`Multicall: ${tx.hash}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});