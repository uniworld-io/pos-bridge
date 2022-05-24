// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./ITokenPredicate.sol";
import "../../common/AccessControlUni.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";


contract ERC721Predicate is ITokenPredicate, AccessControlUni, Initializable, IERC721Receiver {

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    bytes32 public constant TOKEN_TYPE = keccak256("ERC721");

    event LockedERC721(address indexed depositor, address indexed rootToken, uint256 tokenId);
    event UnlockedERC721(address withdrawer, address indexed rootToken, uint256 tokenId);

    function initialize(address _owner) external initializer {
        _setupRole(MANAGER_ROLE, _owner);
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
    }

    function onERC721Received(address, address, uint256, bytes calldata) external override returns (bytes4){
        return IERC721Receiver.onERC721Received.selector;
    }


    function lockTokens(address depositor, address rootToken, bytes calldata depositData)
    override external only(MANAGER_ROLE) {
        //@TODO batch later
        (uint256 tokenId,) = abi.decode(depositData, (uint256, string));
        IERC721(rootToken).safeTransferFrom(depositor, address(this), tokenId);
        emit LockedERC721(depositor, rootToken, tokenId);
    }

    function unlockTokens(address withdrawer, address rootToken, bytes calldata data)
    override external only(MANAGER_ROLE) {
        uint256 tokenId = abi.decode(data, (uint256));
        IERC721(rootToken).safeTransferFrom(address(this), withdrawer, tokenId);
        emit UnlockedERC721(withdrawer, rootToken, tokenId);
    }
}