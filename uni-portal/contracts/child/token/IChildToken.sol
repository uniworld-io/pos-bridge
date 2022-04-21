pragma solidity >=0.4.4 <0.6.0;

interface IChildToken {
    function deposit(address user, bytes calldata depositData) external;
}
