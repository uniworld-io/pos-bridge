pragma solidity >=0.4.4 <0.6.0;

interface ITokenPredicate {
    function lockTokens(address depositor, address rootToken, uint256 amount, uint rootChainId, address receiver) external;

    function unlockTokens(address sender, address rootToken, uint256 amount, uint rootChainId,  address receiver) external;

}