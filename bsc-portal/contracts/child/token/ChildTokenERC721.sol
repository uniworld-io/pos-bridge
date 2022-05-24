// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./IChildToken.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../../common/AccessControlUni.sol";


contract ChildTokenERC721 is ERC721, AccessControlUni, IChildToken {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    mapping(uint256 => string) private tokenToUri;

    constructor(string memory _name,
        string memory _symbol,
        address childChainManager) ERC721(_name, _symbol) public {
        _setupContractId("ChildERC721");
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, childChainManager);
        _setupRole(BURNER_ROLE, childChainManager);

    }

    function deposit(address user, bytes calldata depositData) override external only(MINTER_ROLE) {
        (uint256 tokenId, string memory uri) = abi.decode(depositData, (uint256, string));
        _mint(user, tokenId);
        tokenToUri[tokenId] = uri;
    }

    function withdraw(address user, bytes calldata withdrawData) override external only(BURNER_ROLE) {
        uint256 tokenId = abi.decode(withdrawData, (uint256));
        require(user == ownerOf(tokenId), "ChildERC721: INVALID_TOKEN_OWNER");
        _burn(tokenId);
        delete tokenToUri[tokenId];
    }

    /**
   * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory uri = tokenToUri[tokenId];
        return bytes(uri).length > 0 ? uri : "";
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

}
