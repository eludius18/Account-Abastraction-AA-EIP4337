# Account-Abastraction-AA-EIP4337

This project is an implementation of the Account Abstraction proposal (EIP-4337) using Hardhat, a development environment for Ethereum. The project contains two main contracts: `EntryPoint` and `AccountFactory`


## Branches Explanation

This project uses different branches for various stages of development and deployment. Here's a brief explanation of each branch:

### 1-run-localhost

This branch is used for local development and testing. It contains all the necessary configurations and scripts to run the project on a local Ethereum network, such as Hardhat Network. This is the branch you should use when you want to develop new features or test existing ones in a local environment.

### 2-arbitrum-deployment

This branch is specifically for deploying the contracts to the Arbitrum network. It contains the necessary configurations and scripts to deploy the contracts to the Arbitrum testnet or mainnet. Use this branch when you're ready to test your contracts in a testnet environment or when you're ready to deploy to the mainnet.

### 3-arbitrum-multicall

This branch is used for executing batch transactions on the Arbitrum network. It contains scripts that use the multicall feature of the Arbitrum network to execute multiple contract calls in a single transaction. This is useful for reducing gas costs and simplifying transaction management.


## Project Structure

- `contracts/`: Contains the Solidity contracts for the project
- `deploy/`: Contains the deployment scripts for the contracts
- `test/`: Contains the test scripts for the contracts


## Prerequisites

- Node.js and npm installed on your machine
- Hardhat installed globally or locally in your project. You can install it using `npm install --save-dev hardhat`


## Setup

1. Clone the repository to your local machine using `git clone https://github.com/eludius18/Account-Abastraction-AA-EIP4337.git`

2. Navigate to the project directory

3. Install the project dependencies using `npm install`


## Deploying the Contracts

Follow these steps to deploy the contracts:

1. Compile the contracts using `npx hardhat compile`. This step is necessary before you can deploy the contracts

2. Deploy the `AccountFactory` contract using `npx hardhat deploy --network arbitrum --tags AccountFactory`. This deploys the `AccountFactory`

3. Deploy the `EntryPoint` contract using `npx hardhat deploy --network arbitrum --tags EntryPoint`. This deploys the `EntryPoint` (When using Alchemy Bundler, interactions should be made through its EntryPoint Contract)

4. Deploy the `Paymaster` contract using `npx hardhat deploy --network arbitrum --tags Paymaster`. This deploys the `Paymaster`

> **Note:** The `--network arbitrum` flag is used to specify that the contracts should be deployed to the Arbitrum Sepolia network that you started in step 1


## Setting Up Environment Variables

Before running the scripts, you need to set up your environment variables. Follow these steps:

1. Create a new file in the root of your project named `.env`

2. Open the `.env` file and add the following variables:

```env
FACTORY_ADDRESS=<YOUR_ACCOUNT_FACTORY_CONTRACT_ADDRESS>
ENTRYPOINT_ADDRESS=<YOUR_ENTRYPOINT_CONTRACT_ADDRESS> --> When using Alchemy Bundler, interactions should be made through its EntryPoint Contract
PAYMASTER_ADDRESS=<YOUR_PAYMASTER_CONTRACT_ADDRESS>
RPC_URL_ARBITRUM=<YOUR_ARBITRUM_RPC_URL>
PRIVATE_KEY=<YOUR_PRIVATE_KEY>
```


## Executing the Scripts

Follow these steps to execute the scripts:

1. Run the `1-execute.ts` script using `npx hardhat run --network arbitrum scripts/1-execute.js`. This script interacts with the deployed contracts for the first execution.

2. Add `ACCOUNT_ADDRESS` to the `.env` file. The value for `ACCOUNT_ADDRESS` should be the `Sender` address logged to the console when executing the previous step. It should look like this: `ACCOUNT_ADDRESS=<YOUR_ACCOUNT_ADDRESS>`.


## Checking Account Balances

You may want to run the `nonceAccount.ts` script for getting the nonce. You can do this by running:

```bash
npx hardhat run --network arbitrum scripts/nonceAccount.ts
```

You may want to check the balance of the deployed contracts. You can do this by running the `accountBalance.ts` script:

```bash
npx hardhat run --network arbitrum scripts/accountBalance.ts

```


## Contributing

Contributions are welcome! Please feel free to submit a pull request