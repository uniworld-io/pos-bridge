pragma solidity ^0.8.0;

import "./IChildToken.sol";
import "../../common/AccessControlUni.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract ChildERC1155 is ERC1155, AccessControlUni, IChildToken {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    constructor(string memory uri_, address childChainManager)
    public
    ERC1155(uri_)
    {
        _setupContractId("ChildERC1155");
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, childChainManager);
        _setupRole(BURNER_ROLE, childChainManager);
    }

    function deposit(address user, bytes calldata depositData) override external only(MINTER_ROLE) {
        (
            uint256[] memory ids,
            uint256[] memory amounts,
            bytes memory data
        ) = abi.decode(depositData, (uint256[], uint256[], bytes));
        require(user != address(0x0), "ChildERC1155: INVALID_DEPOSIT_USER");
        _mintBatch(user, ids, amounts, data);
    }

    function withdraw(address user, bytes calldata withdrawData) override external only(MINTER_ROLE) {
        (
            uint256[] memory ids,
            uint256[] memory amounts
        ) = abi.decode(withdrawData, (uint256[], uint256[]));
        _burnBatch(user, ids, amounts);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
