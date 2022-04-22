// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface ITokenPredicate {
    function lockTokens(address depositor, address rootToken, uint256 value) external;

    function unlockTokens(address withdrawer, address rootToken, uint256 value) external;

}