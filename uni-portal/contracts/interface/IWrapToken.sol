pragma solidity >=0.4.4 <0.6.0;

interface IWrapToken {
    function mint(address user, bytes calldata data) external;
}
