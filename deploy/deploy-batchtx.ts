import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const batchtx = await deploy("BatchTx", {
    from: deployer,
    log: true
  });

  console.log("BatchTx deployed at: ", batchtx.address);
};

deploy.tags = ["BatchTx"];
export default deploy;