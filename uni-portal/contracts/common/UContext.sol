pragma solidity >=0.4.4 <0.6.0;

//import "@openzeppelin/contracts/GSN/Context.sol";
contract UContext {

    function _msgValue() internal view returns (uint256) {
        return msg.value;
    }

    function _msgSender() internal view returns (address) {
        return msg.sender;
    }

    function _msgData() internal view returns (bytes memory) {
        return msg.data;
    }
}