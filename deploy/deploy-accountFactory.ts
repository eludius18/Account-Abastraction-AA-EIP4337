import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;


  const accountFactory = await deploy("AccountFactory", {
    from: deployer,
    log: true,
    waitConfirmations: 10
  });

  console.log("AccountFactory deployed at: ", accountFactory.address);
};

deploy.tags = ["AccountFactory"];
export default deploy;