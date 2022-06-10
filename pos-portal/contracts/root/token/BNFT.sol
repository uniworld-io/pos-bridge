// This contract is not supposed to be used in production
// It's strictly for testing purpose

pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";


//@Mocktest
contract BNFT is ERC721 {

    mapping(uint256 => string) private _tokenURIs;

    constructor() public ERC721("Root Bsc nft", "BNFT"){
    }

    function mint(address user, uint256 tokenId) public {
        _mint(user, tokenId);
    }

    /**
    * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overriden in child contracts.
     */
    function _baseURI() internal override view virtual returns (string memory) {
        return "https://api.fancybearsmetaverse.com/";
    }
}
