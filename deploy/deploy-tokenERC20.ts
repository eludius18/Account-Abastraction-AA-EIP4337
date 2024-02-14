import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

const tokenName = "Eludius18 Token";
const tokenSymbol = "ETR";

  const tokenerc20 = await deploy("TokenERC20", {
    from: deployer,
    args: [tokenName, tokenSymbol],
    log: true,
    waitConfirmations: 10,
  });

  console.log("TokenERC20 deployed at: ", tokenerc20.address);
};

deploy.tags = ["TokenERC20"];
export default deploy;