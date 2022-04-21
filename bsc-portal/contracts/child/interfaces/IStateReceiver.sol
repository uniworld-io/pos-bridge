pragma solidity ^0.8.0;

interface IStateReceiver {
    function onStateReceive(uint256 id, bytes calldata data) external;
}
