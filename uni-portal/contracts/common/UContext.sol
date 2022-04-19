pragma solidity >=0.4.4 <0.6.0;


import "@openzeppelin/contracts/GSN/Context.sol";

contract UContext is Context{

    function _msgValue() internal view returns (uint256) {
        return msg.value;
    }
}