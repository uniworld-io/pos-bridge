pragma solidity ^0.8.0;

import "./ITokenPredicate.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../../common/AccessControlUni.sol";

contract ERC1155Predicate is ITokenPredicate, AccessControlUni, Initializable {
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    bytes32 public constant TOKEN_TYPE = keccak256("ERC1155");

    event LockedBatchERC1155(address indexed depositor, address indexed rootToken, uint256[] ids, uint256[] amounts);

    event UnlockERC1155(address indexed withdrawer, address indexed rootToken, uint256[] ids, uint256[] amounts);

    function initialize(address _owner) external initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(MANAGER_ROLE, _owner);
    }

    function lockTokens(address depositor, address rootToken, bytes calldata depositData)
    override external only(MANAGER_ROLE) {
        (
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
        ) = abi.decode(depositData, (uint256[], uint256[], bytes));

        IERC1155(rootToken).safeBatchTransferFrom(depositor, address(this), ids, amounts, data);
        emit LockedBatchERC1155(depositor, rootToken, ids, amounts);
    }

    function unlockTokens(address withdrawer, address rootToken, bytes calldata data)
    override external only(MANAGER_ROLE) {
        (
            uint256[] memory ids,
            uint256[] memory amounts,
        ) = abi.decode(data, (uint256[], uint256[]));

        IERC1155(rootToken).safeBatchTransferFrom(address(this), withdrawer, ids, amounts, bytes("")
        );

        emit UnlockERC1155(withdrawer, rootToken, ids, amounts);
    }
}
