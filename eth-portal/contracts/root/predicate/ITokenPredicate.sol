// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface ITokenPredicate {
    function lockTokens(address depositor, address rootToken, bytes calldata data) external;

    function unlockTokens(address withdrawer, address rootToken, bytes calldata data) external;

}