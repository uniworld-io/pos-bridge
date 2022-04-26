pragma solidity ^0.5.8;

contract Deposit{
    event Deposited(address indexed payee, uint256 weiAmount);
    event Withdrawn(address indexed payee, uint256 weiAmount);

    function deposit() public payable {
        require(msg.value > 0);
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw() public {
        uint256 balance = address(this).balance;
        msg.sender.transfer(balance);
        emit Withdrawn(msg.sender, balance);
    }


    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}