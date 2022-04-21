pragma solidity >=0.4.4 <0.6.0;


interface IRootChainManager{
    function mapToken(uint rootChainId, address rootToken, uint childChainId, address childToken) external;
    function unmapToken(uint rootChainId, address rootToken, uint childChainId, address childToken) external;
    function deposit(bytes calldata data) external;

    event TokenMapped(uint rootChainId, address rootToken, uint childChainId, address childToken);
    event PredicateRegistered(bytes32 tokenType, address tokenAddress);
    event ValidatorChanged(address validator, bytes calldata data);

}