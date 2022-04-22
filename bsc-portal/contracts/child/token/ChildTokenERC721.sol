//// SPDX-License-Identifier: GPL-3.0

//
//pragma solidity ^0.8.0;
//
//import "./IChildToken.sol";
//import "../../common/Initializable.sol";
//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "../../common/AccessControlUni.sol";
//
//
//contract ChildTokenERC721 is ERC721, AccessControlUni, IChildToken, Initializable {
//
//    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
//
//    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) public{}
//
//    event WithdrawnBatch(address indexed user, uint256[] tokenIds);
//
//
//    function initialize(address _owner) external initializer {
//        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
//        _setupRole(MINTER_ROLE, _owner);
//    }
//
//
//    function deposit(address user, bytes calldata depositData) override external only(MINTER_ROLE){
//        // deposit single
//        if (depositData.length == 32) {
//            uint256 tokenId = abi.decode(depositData, (uint256));
//            _mint(user, tokenId);
//
//            // deposit batch
//        } else {
//            uint256[] memory tokenIds = abi.decode(depositData, (uint256[]));
//            uint256 length = tokenIds.length;
//            for (uint256 i; i < length; i++) {
//                _mint(user, tokenIds[i]);
//            }
//        }
//    }
//
//    function withdraw(uint256 tokenId) public {
//        require(_msgSender() == ownerOf(tokenId), "ChildURC721: INVALID_TOKEN_OWNER");
//        _burn(tokenId);
//    }
//
////    function withdrawBatch(uint256[] calldata tokenIds) external {
////        uint256 length = tokenIds.length;
////        require(length <= BATCH_LIMIT, "ChildERC721: EXCEEDS_BATCH_LIMIT");
////        for (uint256 i; i < length; i++) {
////            uint256 tokenId = tokenIds[i];
////            require(_msgSender() == ownerOf(tokenId), string(abi.encodePacked("ChildERC721: INVALID_TOKEN_OWNER ", tokenId)));
////            _burn(tokenId);
////        }
////        emit WithdrawnBatch(_msgSender(), tokenIds);
////    }
//
//}
