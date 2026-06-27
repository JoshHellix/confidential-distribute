// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IFHEAirdropFactory
/// @notice TokenOps confidential airdrop factory (Sepolia). New campaign contracts are deployed per launch.
interface IFHEAirdropFactory {
    event AirdropCreated(address indexed airdrop, address indexed token, address indexed admin);

    function createConfidentialAirdrop(
        address token,
        uint256 startTimestamp,
        uint256 endTimestamp,
        bool canExtendClaimWindow,
        address admin,
        bytes32 salt
    ) external returns (address airdrop);
}
