// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./ITokenPredicate.sol";
import "../../common/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../common/AccessControlUni.sol";


contract EtherPredicate is ITokenPredicate, AccessControlUni, Initializable {

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant TOKEN_TYPE = keccak256("NATIVE");


    function initialize(address rootManager) external initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, rootManager);
        _setupRole(MANAGER_ROLE, rootManager);
        _setupContractId("EtherPredicate");
    }

    receive() external payable only(MANAGER_ROLE) {}


    function lockTokens(address depositor, address rootToken, bytes calldata data) override external only(MANAGER_ROLE){
        //        uint256 amount = abi.decode(data, (uint256));
        //@todo
    }

    function unlockTokens(address withdrawer, address, bytes calldata data) override external only(MANAGER_ROLE){
        uint256 amount = abi.decode(data, (uint256));
        require(address(this).balance >= amount, "EtherPredicate: NOT_ENOUGH_BALANCE");
        (bool success, /* bytes memory data */) = withdrawer.call{value: amount}("");
        if (!success) {
            revert("EtherPredicate: ETH_TRANSFER_FAILED");
        }
    }

}
