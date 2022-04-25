pragma solidity ^0.8.0;

import "./interface/IRootChainManager.sol";
import "./StateSender/IStateSender.sol";
import "./interface/ITokenPredicate.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract RootChainManager is IRootChainManager, Initializable, AccessControlEnumerable {
    using SafeMath for uint256;

    //todo future RootChainManagerStorage to upgrade contract more ez
    mapping(bytes32 => address) public typeToPredicate;
    mapping(address => address) public rootToChildToken;
    mapping(address => address) public childToRootToken;
    mapping(address => bytes32) public tokenToType;
    mapping(bytes32 => bool) public processedExits;
    address public childChainManagerAddress;
    IStateSender internal _stateSender;

    // maybe DEPOSIT and MAP_TOKEN can be reduced to bytes4
    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    bytes32 public constant MAP_TOKEN = keccak256("MAP_TOKEN");
    address public constant ETHER_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    bytes32 public constant MAPPER_ROLE = keccak256("MAPPER_ROLE");

    /**
     * @notice Deposit ether by directly sending to the contract
     * The account sending ether receives WETH on child chain
     */
    receive() external payable {
        _depositEtherFor(_msgSender());
    }

    /**
     * @notice Initialize the contract after it has been proxified
     * @dev meant to be called once immediately after deployment
     * @param _owner the account that should be granted admin role
     */
    function initialize(
        address _owner
    )
    external
    initializer
    {
//        _initializeEIP712("RootChainManager");
//        _setupContractId("RootChainManager");
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(MAPPER_ROLE, _owner);
    }

    /**
     * @notice Set the state sender, callable only by admins
     * @dev This should be the state sender from plasma contracts
     * It is used to send bytes from root to child chain
     * @param newStateSender address of state sender contract
     */
    function setStateSender(address newStateSender)
    external
    {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "must have admin role");
        require(newStateSender != address(0), "RootChainManager: BAD_NEW_STATE_SENDER");
        _stateSender = IStateSender(newStateSender);
    }

    /**
     * @notice Get the address of contract set as state sender
     * @return The address of state sender contract
     */
    function stateSenderAddress() external view returns (address) {
        return address(_stateSender);
    }


    /**
     * @notice Set the child chain manager, callable only by admins
     * @dev This should be the contract responsible to receive deposit bytes on child chain
     * @param newChildChainManager address of child chain manager contract
     */
    function setChildChainManagerAddress(address newChildChainManager)
    external
    {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "must have admin role");
        require(newChildChainManager != address(0x0), "RootChainManager: INVALID_CHILD_CHAIN_ADDRESS");
        childChainManagerAddress = newChildChainManager;
    }

    /**
     * @notice Register a token predicate address against its type, callable only by ADMIN
     * @dev A predicate is a contract responsible to process the token specific logic while locking or exiting tokens
     * @param tokenType bytes32 unique identifier for the token type
     * @param predicateAddress address of token predicate address
     */
    function registerPredicate(bytes32 tokenType, address predicateAddress)
    external
    override
    {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "must have admin role");
        typeToPredicate[tokenType] = predicateAddress;
        emit PredicateRegistered(tokenType, predicateAddress);
    }

    /**
     * @notice Map a token to enable its movement via the PoS Portal, callable only by mappers
     * @param rootToken address of token on root chain
     * @param childToken address of token on child chain
     * @param tokenType bytes32 unique identifier for the token type
     */
    function mapToken(
        address rootToken,
        address childToken,
        bytes32 tokenType
    ) external override only(MAPPER_ROLE) {
        require(hasRole(MAPPER_ROLE, _msgSender()), "must have mapper role");
        // explicit check if token is already mapped to avoid accidental remaps
        require(
            rootToChildToken[rootToken] == address(0) &&
            childToRootToken[childToken] == address(0),
            "RootChainManager: ALREADY_MAPPED"
        );
        _mapToken(rootToken, childToken, tokenType);
    }

    /**
     * @notice Clean polluted token mapping
     * @param rootToken address of token on root chain. Since rename token was introduced later stage,
     * clean method is used to clean pollulated mapping
     */
    function cleanMapToken(
        address rootToken,
        address childToken
    ) external override {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "must have admin role");
        rootToChildToken[rootToken] = address(0);
        childToRootToken[childToken] = address(0);
        tokenToType[rootToken] = bytes32(0);

        emit TokenMapped(rootToken, childToken, tokenToType[rootToken]);
    }

    /**
    * @notice Remap a token that has already been mapped, properly cleans up old mapping
     * Callable only by ADMIN
     * @param rootToken address of token on root chain
     * @param childToken address of token on child chain
     * @param tokenType bytes32 unique identifier for the token type
     */
    function remapToken(
        address rootToken,
        address childToken,
        bytes32 tokenType
    ) external override {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "must have admin role");
        // cleanup old mapping
        address oldChildToken = rootToChildToken[rootToken];
        address oldRootToken = childToRootToken[childToken];

        if (rootToChildToken[oldRootToken] != address(0)) {
            rootToChildToken[oldRootToken] = address(0);
            tokenToType[oldRootToken] = bytes32(0);
        }

        if (childToRootToken[oldChildToken] != address(0)) {
            childToRootToken[oldChildToken] = address(0);
        }

        _mapToken(rootToken, childToken, tokenType);
    }

    function _mapToken(
        address rootToken,
        address childToken,
        bytes32 tokenType
    ) private {
        require(
            typeToPredicate[tokenType] != address(0x0),
            "RootChainManager: TOKEN_TYPE_NOT_SUPPORTED"
        );

        rootToChildToken[rootToken] = childToken;
        childToRootToken[childToken] = rootToken;
        tokenToType[rootToken] = tokenType;

        emit TokenMapped(rootToken, childToken, tokenType);

        bytes memory syncData = abi.encode(rootToken, childToken, tokenType);
        _stateSender.syncState(
            childChainManagerAddress,
            abi.encode(MAP_TOKEN, syncData)
        );
    }

    /**
     * @notice Move ether from root to child chain, accepts ether transfer
     * Keep in mind this ether cannot be used to pay gas on child chain
     * Use Matic tokens deposited using plasma mechanism for that
     * @param user address of account that should receive WETH on child chain
     */
    function depositEtherFor(address user) external override payable {
        _depositEtherFor(user);
    }

    /**
     * @notice Move tokens from root to child chain
     * @dev This mechanism supports arbitrary tokens as long as its predicate has been registered and the token is mapped
     * @param user address of account that should receive this deposit on child chain
     * @param rootToken address of token that is being deposited
     * @param depositData bytes data that is sent to predicate and child token contracts to handle deposit
     */
    function depositFor(
        address user,
        address rootToken,
        bytes calldata depositData
    ) external override {
        require(
            rootToken != ETHER_ADDRESS,
            "RootChainManager: INVALID_ROOT_TOKEN"
        );
        _depositFor(user, rootToken, depositData);
    }

    function _depositEtherFor(address user) private {
        bytes memory depositData = abi.encode(msg.value);
        _depositFor(user, ETHER_ADDRESS, depositData);

        // payable(typeToPredicate[tokenToType[ETHER_ADDRESS]]).transfer(msg.value);
        // transfer doesn't work as expected when receiving contract is proxified so using call
        (bool success, /* bytes memory data */) = typeToPredicate[tokenToType[ETHER_ADDRESS]].call{value: msg.value}("");
        if (!success) {
            revert("RootChainManager: ETHER_TRANSFER_FAILED");
        }
    }

    function _depositFor(
        address user,
        address rootToken,
        bytes memory depositData
    ) private {
        bytes32 tokenType = tokenToType[rootToken];
        require(
            rootToChildToken[rootToken] != address(0x0) &&
            tokenType != 0,
            "RootChainManager: TOKEN_NOT_MAPPED"
        );
        address predicateAddress = typeToPredicate[tokenType];
        require(
            predicateAddress != address(0),
            "RootChainManager: INVALID_TOKEN_TYPE"
        );
        require(
            user != address(0),
            "RootChainManager: INVALID_USER"
        );

        ITokenPredicate(predicateAddress).lockTokens(
            _msgSender(),
            user,
            rootToken,
            depositData
        );
        bytes memory syncData = abi.encode(user, rootToken, depositData);
        _stateSender.syncState(
            childChainManagerAddress,
            abi.encode(DEPOSIT, syncData)
        );
    }

    //todo exit
}
