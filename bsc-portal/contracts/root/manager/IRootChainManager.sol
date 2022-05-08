// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

interface IRootChainManager {
    function mapToken(bytes32 typeToken, address rootToken, uint32 childChainId, address childToken) external;

    function unmapToken(address rootToken, uint32 childChainId, address childToken) external;

    function deposit(address receiver, address rootToken, uint32 childChainId, bytes calldata depositData) external;

    event TokenMapped(uint32 rootChainId, address rootToken, uint32 childChainId, address childToken, bytes32 typeToken);

}