pragma solidity >=0.4.4 <0.6.0;

interface IChainManager {
    function mapToken(uint srcChainId, address srcToken, uint dstChainId, address dstToken) external;

    function unmapToken(uint srcChainId, address srcToken, uint dstChainId, address dstToken) external;

    function deposit(address from, address to, address fromToken, address toToken, uint256 amount);

    function registerPredicate(bytes32 tokenType, address predicateAddress) public;

    function validatorChanged(address validator, bytes calldata data) public;



    event TokenMapped(uint srcChainId, address srcToken, uint dstChainId, address dstToken);
    event PredicateRegistered(bytes32 tokenType, address tokenAddress);
    event ValidatorChanged(address validator, bytes calldata data);

}
