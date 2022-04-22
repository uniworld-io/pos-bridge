// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

interface IChildChainManager{
    function mapToken(uint rootChainId, address rootToken, uint childChainId, address childToken) external;

    function unmapToken(uint rootChainId, address rootToken, uint childChainId, address childToken) external;

    function validatorChanged(address validator, address validatorPk, bytes[] memory signatures) external;

    event TokenMapped(uint rootChainId, address rootToken, uint childChainId, address childToken);
}