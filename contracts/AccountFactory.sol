// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Account.sol";

contract AccountFactory {

    function createAccount(address owner) external returns (address) {
        Account account = new Account(owner);
        return address(account);
    }
}