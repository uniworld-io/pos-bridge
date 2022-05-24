// This contract is not supposed to be used in production
// It's strictly for testing purpose

pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";


//@Mocktest
contract UniTestERC721 is ERC721 {

    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory name_,
        string memory symbol_) public ERC721(name_, symbol_){
    }

    function mint(uint256 tokenId) public {
        _mint(_msgSender(), tokenId);
    }

    /**
  * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory uri = _tokenURIs[tokenId];
        return bytes(uri).length > 0 ? uri : "";
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) external virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
}