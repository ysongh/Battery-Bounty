// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BatteryBounty is ERC20 {
    uint _transactionIds = 0;

    struct RecycleTransaction {
        address user;
        uint256 batteryCount;
        uint256 rewardAmount;
        bool verified;
    }

    mapping(address => bool) public authorizedRecyclers;
    mapping(bytes32 => RecycleTransaction) public recycleTransactions;
    mapping(address => bytes32[]) public userRecycleTransactions;

    uint256 public constant REWARD_PER_BATTERY = 10; // 10 tokens per battery

    event RecycleTransactionCreated(bytes32 transactionId, address user, uint256 batteryCount);
    event RecycleTransactionVerified(bytes32 transactionId, address recycler);

    constructor(uint256 initialSupply) ERC20("BatteryBounty", "BB") {
        _mint(msg.sender, initialSupply);
    }

    function addAuthorizedRecycler(address recycler) public {
        authorizedRecyclers[recycler] = true;
    }

    function removeAuthorizedRecycler(address recycler) public {
        authorizedRecyclers[recycler] = false;
    }

    function createRecycleTransaction(uint256 batteryCount) public returns (bytes32) {
        _transactionIds++;
        uint256 transactionId = _transactionIds;
        bytes32 transactionHash = keccak256(abi.encodePacked(transactionId, msg.sender, batteryCount));

        recycleTransactions[transactionHash] = RecycleTransaction({
            user: msg.sender,
            batteryCount: batteryCount,
            rewardAmount: batteryCount * REWARD_PER_BATTERY,
            verified: false
        });

        userRecycleTransactions[msg.sender].push(transactionHash);

        emit RecycleTransactionCreated(transactionHash, msg.sender, batteryCount);
        return transactionHash;
    }

    function verifyRecycleTransaction(bytes32 transactionHash) public {
        require(authorizedRecyclers[msg.sender], "Not an authorized recycler");
        RecycleTransaction storage transaction = recycleTransactions[transactionHash];
        require(!transaction.verified, "Transaction already verified");

        transaction.verified = true;
        _mint(transaction.user, transaction.rewardAmount);

        emit RecycleTransactionVerified(transactionHash, msg.sender);
    }

    function getRecycleTransaction(bytes32 transactionHash) public view returns (
        address user,
        uint256 batteryCount,
        uint256 rewardAmount,
        bool verified
    ) {
        RecycleTransaction storage transaction = recycleTransactions[transactionHash];
        return (
            transaction.user,
            transaction.batteryCount,
            transaction.rewardAmount,
            transaction.verified
        );
    }

    function getUserRecycleTransaction() public view returns (bytes32[] memory) {
        return userRecycleTransactions[msg.sender];
    }
}