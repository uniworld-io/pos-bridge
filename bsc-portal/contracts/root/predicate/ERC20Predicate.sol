// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./ITokenPredicate.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
//import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../common/AccessControlUni.sol";


contract ERC20Predicate is ITokenPredicate, AccessControlUni, Initializable {
//    using SafeERC20Upgradeable for IERC20;

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");


    //Sync message
    event LockedERC20(address depositor, address rootToken, uint256 amount);
    event UnlockedERC20(address withdrawer, address rootToken, uint256 amount);

    function initialize(address rootManager) external initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, rootManager);
        _setupRole(MANAGER_ROLE, rootManager);
        _setupContractId("ERC20Predicate");
    }

    function lockTokens(address depositor, address rootToken, bytes calldata data) override external only(MANAGER_ROLE){
        uint256 value = abi.decode(data, (uint256));
        IERC20(rootToken).transferFrom(depositor, address(this), value);
        emit LockedERC20(depositor, rootToken, value);
    }

    function unlockTokens(address withdrawer, address rootToken, bytes calldata data) override external only(MANAGER_ROLE){
        uint256 value = abi.decode(data, (uint256));
        IERC20(rootToken).transfer(withdrawer, value);
        emit UnlockedERC20(withdrawer, rootToken, value);
    }

}