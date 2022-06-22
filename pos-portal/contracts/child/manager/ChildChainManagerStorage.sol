// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

abstract contract ChildChainManagerStorage {
    mapping(uint32 => mapping(address => address)) public rootToChildToken;
    mapping(address => address) public childToRootToken;
    mapping(address => uint32) public rootToChainId;
    uint32 public childChainId;
    mapping(uint32 => mapping(string => bytes32)) public txToMsgHash;
}
