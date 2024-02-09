// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Account.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

contract AccountFactory {

    function createAccount(address owner) external returns (address) {

        bytes32 salt = bytes32(uint256(uint160(owner)));
        bytes memory byteCode = abi.encodePacked(type(Account).creationCode, abi.encode(owner));

        address addr = Create2.computeAddress(salt, keccak256(byteCode));
        if (addr.code.length > 0) {
            return addr;
        }
        return Create2.deploy(0, salt, byteCode);
    }
}