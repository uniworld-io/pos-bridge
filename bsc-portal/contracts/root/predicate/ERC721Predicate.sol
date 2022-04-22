// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./ITokenPredicate.sol";
import "../../common/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../../common/AccessControlUni.sol";


contract ERC721Predicate is ITokenPredicate, AccessControlUni, Initializable {
    using SafeERC20 for IERC20;

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    bytes32 public constant TOKEN_TYPE = keccak256("ERC20");

    function initialize(address _owner) external initializer {
        _setupRole(MANAGER_ROLE, _owner);
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
    }


    function lockTokens(address depositor, address rootToken, uint256 value)
    override external only(MANAGER_ROLE) {
        //@TODO
    }

    function unlockTokens(address withdrawer, address rootToken, uint256 value)
    override external only(MANAGER_ROLE) {
        //@TODO

    }
}