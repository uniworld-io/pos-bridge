pragma solidity ^0.8.0;

interface IStateSender {
    function syncState(address receiver, bytes calldata data) external;
}
