//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";

/// @title Lottery Smart Contract using block timestamp/difficulty as a source of randomness.
/// @author eludius18
/// @notice This Smart Contract allow to enter ETH and takes prizes
contract TokenERC20 is
    ERC20,
    Ownable,
    Pausable,
    ReentrancyGuard,
    Multicall
{
    constructor(string memory _name, string memory _symbol) 
    ERC20(_name, _symbol)
    {
        _mint(msg.sender, 1000000000000000000000000);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}