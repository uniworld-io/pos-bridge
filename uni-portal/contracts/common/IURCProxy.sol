pragma solidity >=0.4.4 <0.6.0;


interface IURCProxy {
    function implementation() external view returns (address codeAddr);
}