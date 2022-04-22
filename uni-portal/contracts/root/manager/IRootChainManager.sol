pragma solidity >=0.4.4 <0.6.0;


interface IRootChainManager{
    function mapToken(bytes32 typeToken, uint rootChainId, address rootToken, uint childChainId, address childToken) external;
    function unmapToken(bytes32 typeToken, uint rootChainId, address rootToken, uint childChainId, address childToken) external;
    function deposit(bytes calldata data) external;

    event TokenMapped(uint rootChainId, address rootToken, uint childChainId, address childToken, bytes32 typeToken);

}