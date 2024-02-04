# Account-Abastraction-AA-EIP4337

This project is an implementation of the Account Abstraction proposal (EIP-4337) using Hardhat, a development environment for Ethereum. The project contains two main contracts: `EntryPoint` and `AccountFactory`.

## Project Structure

- `contracts/`: Contains the Solidity contracts for the project.
- `deploy/`: Contains the deployment scripts for the contracts.
- `test/`: Contains the test scripts for the contracts.

## Prerequisites

- Node.js and npm installed on your machine.
- Hardhat installed globally or locally in your project. You can install it using `npm install --save-dev hardhat`.

## Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the project dependencies using `npm install`.

## Running the Project

1. Start a local Hardhat network in a new terminal window using `npx hardhat node --no-deploy`.
2. In another terminal window, navigate to the project directory.
3. Deploy the `EntryPoint` contract using `npx hardhat deploy --network localhost --tags EntryPoint`.
4. Deploy the `AccountFactory` contract using `npx hardhat deploy --network localhost --tags AccountFactory`.
5. Run the `execute.ts` script using `npx hardhat run --network localhost scripts/execute.ts`

> **Note:** Please note that the `--network localhost` flag is used to specify that the contracts should be deployed to the local Hardhat network that you started in step 1.
## Contributing

Contributions are welcome! Please feel free to submit a pull request.