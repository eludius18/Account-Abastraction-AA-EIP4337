// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Account is 
    IAccount, 
    Multicall,
    ERC20,
    Ownable,
    Pausable,
    ReentrancyGuard
    {
    uint256 public count;

    constructor() ERC20("testToken", "TST") {
        Ownable.transferOwnership(address(this));
        _mint(address(this), 1000000 * 10 ** decimals());
        _mint(0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789, 1000000 * 10 ** decimals());
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

    function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256) 
        external
        view
        returns (uint256 validationData) 
    {
        address recovered = ECDSA.recover(ECDSA.toEthSignedMessageHash(userOpHash), userOp.signature);


        return owner() == recovered ? 0 : 1;

    }

    function execute(bytes[] calldata data) 
    external
    {
        this.multicall(data);
    }
}