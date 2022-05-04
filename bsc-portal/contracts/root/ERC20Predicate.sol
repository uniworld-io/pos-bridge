pragma solidity ^0.8.0;

import "./interface/ITokenPredicate.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ERC20Predicate is ITokenPredicate, AccessControlEnumerable {

    using SafeERC20 for IERC20;

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant TOKEN_TYPE = keccak256("ERC20");

    event LockedERC20(
        address indexed depositor,
        address indexed depositReceiver,
        address indexed rootToken,
        uint256 amount
    );

    event ExitedERC20(
        address indexed exitor,
        address indexed rootToken,
        uint256 amount
    );

    //    function initialize(address _owner) external initializer {
    ////        _setupContractId("ERC20Predicate");
    //        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
    //        _setupRole(MANAGER_ROLE, _owner);
    //    }
    constructor(
        address _owner
    ) {
        //        _setupContractId("WrapTokenERC20");
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(MANAGER_ROLE, _owner);
    }

    /**
     * @notice Lock ERC20 tokens for deposit, callable only by manager
     * @param depositor Address who wants to deposit tokens
     * @param depositReceiver Address (address) who wants to receive tokens on child chain
     * @param rootToken Token which gets deposited
     * @param depositData ABI encoded amount
     */
    function lockTokens(
        address depositor,
        address depositReceiver,
        address rootToken,
        bytes calldata depositData
    )
    external
    override
    {
        require(hasRole(MANAGER_ROLE, _msgSender()), "must have manager role");
        uint256 amount = abi.decode(depositData, (uint256));
        emit LockedERC20(depositor, depositReceiver, rootToken, amount);
        IERC20(rootToken).safeTransferFrom(depositor, address(this), amount);
    }

    /**
    //todo validate log to withdraw true value  - prevent hack NOTE: use : RLPReader
     * @param rootToken Token which gets withdrawn
     * @param log Valid ERC20 burn log from child chain
     */
    function exitTokens(
        address,
        address rootToken,
        bytes calldata log
    )
    external
    override
    {
        require(hasRole(MANAGER_ROLE, _msgSender()), "must have manager role");
        (address withdrawer, uint256 amount) = abi.decode(
            log,
            (address, uint256)
        );

        IERC20(rootToken).safeTransfer(
            withdrawer,
            amount
        );

        emit ExitedERC20(withdrawer, rootToken, amount);
    }
}
