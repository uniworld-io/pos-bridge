// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./IChildToken.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../../common/AccessControlUni.sol";


contract ChildTokenERC721 is ERC721, AccessControlUni, IChildToken {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory _name, string memory _symbol, address childChainManager) ERC721(_name, _symbol) public {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(DEPOSITOR_ROLE, childChainManager);
    }

    function deposit(address user, bytes calldata depositData) override external only(MINTER_ROLE) {
        uint256 tokenId = abi.decode(depositData, (uint256));
        _mint(user, tokenId);
    }

    function withdraw(bytes calldata withdrawData) override public {
        uint256 tokenId = abi.decode(withdrawData, (uint256));
        require(_msgSender() == ownerOf(tokenId), "ChildERC721: INVALID_TOKEN_OWNER");
        _burn(tokenId);
    }

}
