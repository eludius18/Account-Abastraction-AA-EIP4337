import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const gasPrice = '20000000000';


  const paymaster = await deploy("Paymaster", {
    from: deployer,
    log: true,
    waitConfirmations: 10,
    gasPrice
  });

  console.log("Paymaster deployed at: ", paymaster.address);
};

deploy.tags = ["Paymaster"];
export default deploy;