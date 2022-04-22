// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

interface IRootChainManager{
    function mapToken(bytes32 typeToken, uint rootChainId, address rootToken, uint childChainId, address childToken) external;
    function unmapToken(uint rootChainId, address rootToken, uint childChainId, address childToken) external;
    function deposit(bytes calldata depositData) external;

    event TokenMapped(uint rootChainId, address rootToken, uint childChainId, address childToken, bytes32 typeToken);

}