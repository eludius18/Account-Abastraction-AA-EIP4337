# Account-Abastraction-AA-EIP4337

This project is an implementation of the Account Abstraction proposal (EIP-4337) using Hardhat, a development environment for Ethereum. The project contains two main contracts: `EntryPoint` and `AccountFactory`


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

1. Start a local Hardhat network in a new terminal window using `npx hardhat node --no-deploy`. This starts a local Ethereum network for development purposes

2. In another terminal window, navigate to the project directory

3. Compile the contracts using `npx hardhat compile`. This step is necessary before you can deploy the contracts

4. Deploy the `EntryPoint` contract using `npx hardhat deploy --network localhost --tags EntryPoint`. This deploys the `EntryPoint`

5. Deploy the `AccountFactory` contract using `npx hardhat deploy --network localhost --tags AccountFactory`. This deploys the `AccountFactory`

6. Deploy the `Paymaster` contract using `npx hardhat deploy --network localhost --tags Paymaster`. This deploys the `Paymaster`

> **Note:** The `--network localhost` flag is used to specify that the contracts should be deployed to the local Hardhat network that you started in step 1


## Setting Up Environment Variables

Before running the scripts, you need to set up your environment variables. Follow these steps:

1. Create a new file in the root of your project named `.env`

2. Open the `.env` file and add the following variables:

```env
FACTORY_NONCE= 1
FACTORY_ADDRESS=<YOUR_ACCOUNT_FACTORY_CONTRACT_ADDRESS>
ENTRYPOINT_ADDRESS=<YOUR_ENTRYPOINT_CONTRACT_ADDRESS>
PAYMASTER_ADDRESS=<YOUR_PAYMASTER_CONTRACT_ADDRESS>
```


## Executing the Scripts

Follow these steps to execute the scripts:

1. Run the `1-execute.ts` script using `npx hardhat run --network localhost scripts/1-execute.ts`. This script interacts with the deployed contracts for the first execution.

2. Add `ACCOUNT_ADDRESS` to the `.env` file. The value for `ACCOUNT_ADDRESS` should be the `Sender` address logged to the console when executing the previous step. It should look like this: `ACCOUNT_ADDRESS=<YOUR_ACCOUNT_ADDRESS>`.

2. Run the `2-execute.ts` script using `npx hardhat run --network localhost scripts/2-execute.ts`. This script interacts with the deployed contracts for subsequent executions.


## Checking Account Balances

You may want to run the `nonceAccount.ts` script for getting the nonce. You can do this by running:

```bash
npx hardhat run --network localhost scripts/nonceAccount.ts
```

You may want to check the balance of the deployed contracts. You can do this by running the `accountBalance.ts` script:

```bash
npx hardhat run --network localhost scripts/accountBalance.ts

```


## Contributing

Contributions are welcome! Please feel free to submit a pull request