// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

interface IChildChainManager {
    function mapToken(address childToken, uint32 rootChainId, address rootToken) external;

    function unmapToken(address childToken, uint32 rootChainId, address rootToken) external;

    function withdraw(address withdrawer, address childToken, uint32 rootChainId, bytes calldata withdrawData) external;

    function validatorChanged(uint8 consensusRate_, uint8 minValidator_, address[] memory validators_) external;

    event TokenMapped(uint32 rootChainId, address rootToken, uint32 childChainId, address childToken);
}