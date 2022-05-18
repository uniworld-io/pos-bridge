// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./ITokenPredicate.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../common/AccessControlUni.sol";


contract EthPredicate is ITokenPredicate, AccessControlUni, Initializable {

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant TOKEN_TYPE = keccak256("ETH");


    //Sync message
    event LockedBnb(address depositor, address rootToken, uint256 amount);
    event UnlockedBnb(address withdrawer, address rootToken, uint256 amount);

    function initialize(address rootManager) external initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, rootManager);
        _setupRole(MANAGER_ROLE, rootManager);
        _setupContractId("EthPredicate");
    }

    receive() external payable only(MANAGER_ROLE) {}


    function lockTokens(address depositor, address rootToken, bytes calldata data) override external only(MANAGER_ROLE){
        uint256 amount = abi.decode(data, (uint256));
        emit LockedBnb(depositor, rootToken, amount);
    }

    function unlockTokens(address withdrawer, address rootToken, bytes calldata data) override external only(MANAGER_ROLE){
        uint256 amount = abi.decode(data, (uint256));
        emit UnlockedBnb(withdrawer, rootToken, amount);
        require(address(this).balance >= amount, "EthPredicate: NOT_ENOUGH_BALANCE");
        (bool success, /* bytes memory data */) = withdrawer.call{value: amount}("");
        if (!success) {
            revert("EthPredicate: ETH_TRANSFER_FAILED");
        }
    }

}