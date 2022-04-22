// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

interface IChildChainManager {
    event TokenMapped(address indexed rootToken, address indexed childToken);

    function mapToken(address rootToken, address childToken) external;
    function cleanMapToken(address rootToken, address childToken) external;
}
