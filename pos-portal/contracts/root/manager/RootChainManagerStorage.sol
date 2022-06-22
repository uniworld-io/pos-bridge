// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

abstract contract RootChainManagerStorage {
    mapping(uint32 => mapping(address => address)) public rootToChildToken;
    mapping(uint32 => mapping(address => address)) public childToRootToken;
    mapping(bytes32 => address) public typeToPredicate;
    mapping(address => bytes32) public tokenToType;
    mapping(uint32 => mapping(string => bytes32)) public txToMsgHash;
    uint32 public rootChainId;
}
