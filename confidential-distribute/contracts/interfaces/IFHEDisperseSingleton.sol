// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IFHEDisperseSingleton
/// @notice TokenOps confidential disperse singleton — bulk encrypted payouts from registered subwallets.
interface IFHEDisperseSingleton {
    event UserRegistered(address indexed user, address indexed holdingWallet, address indexed directWallet);

    function register() external;

    function isRegistered(address user) external view returns (bool);

    function disperse(
        address token,
        address[] calldata recipients,
        bytes32[] calldata encryptedAmounts,
        bytes calldata inputProof
    ) external;
}
