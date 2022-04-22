pragma solidity >=0.4.4 <0.6.0;


interface IChildChainManager{
    function mapToken(uint rootChainId, address rootToken, uint childChainId, address childToken) external;

    function unmapToken(uint rootChainId, address rootToken, uint childChainId, address childToken) external;

    event TokenMapped(uint rootChainId, address rootToken, uint childChainId, address childToken);
}