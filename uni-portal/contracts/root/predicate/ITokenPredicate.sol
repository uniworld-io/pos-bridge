pragma solidity >=0.4.4 <0.6.0;

interface ITokenPredicate{
    function lockTokens(address depositor, address receiver, uint256 amount, address rootToken, address childChainId) external;
    function unlockTokens(address sender, address receiver, uint256 amount, address rootToken) external;
}