pragma solidity ^0.8.0;
pragma abicoder v2;

interface IWrapToken {
    function deposit(address user, bytes calldata depositData) external;
}
