// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

interface IERCProxy {
    function proxyType() external pure returns (uint256 proxyTypeId);

    function implementation() external view returns (address codeAddr);
}