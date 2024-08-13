// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BatteryBounty is ERC20 {
    mapping(address => bool) public authorizedRecyclers;

    constructor(uint256 initialSupply) ERC20("BatteryBounty", "BB") {
        _mint(msg.sender, initialSupply);
    }

    function addAuthorizedRecycler(address recycler) public {
        authorizedRecyclers[recycler] = true;
    }

    function rewardUser(address user, uint256 amount) public {
        require(authorizedRecyclers[msg.sender], "Not an authorized recycler");
        _mint(user, amount);
    }
}