// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//https://eips.ethereum.org/EIPS/eip-6357
interface IMultiDelegatecall {
    function multiDelegatecall(
        bytes[] calldata data
    ) external returns (bytes[] memory results);
}

/// Derived from OpenZeppelin's implementation
abstract contract M is IMultiDelegatecall {
    function multiDelegatecall(
        bytes[] calldata data
    ) external virtual returns (bytes[] memory results) {
        results = new bytes[](data.length);
        for (uint256 i = 0; i < data.length; i++) {
            (bool success, bytes memory returndata) = address(this)
                .delegatecall(data[i]);
            require(success);

            results[i] = returndata;
        }
        return results;
    }
}