// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
interface ITokenPredicate {
    function lockTokens(address depositor, address rootToken, uint256 amount, uint rootChainId, address receiver) external;

    function unlockTokens(address burner, address rootToken, uint256 amount, uint rootChainId,  address withdrawer) external;

}