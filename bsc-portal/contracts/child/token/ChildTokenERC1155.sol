pragma solidity ^0.8.0;

import "./IChildToken.sol";
import "../../common/AccessControlUni.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract ChildERC1155 is ERC1155, AccessControlUni, IChildToken {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory uri_, address childChainManager)
    public
    ERC1155(uri_)
    {
        _setupContractId("ChildERC1155");
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, childChainManager);
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

    function withdraw(bytes calldata withdrawData) override public {
        (
            uint256[] memory ids,
            uint256[] memory amounts,
        ) = abi.decode(depositData, (uint256[], uint256[]));
        _burnBatch(_msgSender(), ids, amounts);
    }
}
