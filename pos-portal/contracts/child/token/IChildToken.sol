// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;
interface IChildToken {
    function deposit(address user, bytes calldata depositData) external;
    function withdraw(address user, bytes calldata withdrawData) external;
}
