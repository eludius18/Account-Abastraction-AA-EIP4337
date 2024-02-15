import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const gasPrice = '20000000000';


  const multicall = await deploy("Multicall", {
    from: deployer,
    log: true,
    waitConfirmations: 10,
    gasPrice
  });

  console.log("Multicall deployed at: ", multicall.address);
};

deploy.tags = ["Multicall"];
export default deploy;