pragma solidity ^0.8.0;

import "./interfaces/IChildChainManager.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract ChildChainManager is IChildChainManager, Initializable, AccessControlEnumerable{
    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    bytes32 public constant MAP_TOKEN = keccak256("MAP_TOKEN");
    bytes32 public constant MAPPER_ROLE = keccak256("MAPPER_ROLE");
    bytes32 public constant STATE_SYNCER_ROLE = keccak256("STATE_SYNCER_ROLE");

    mapping(address => address) public rootToChildToken;
    mapping(address => address) public childToRootToken;

    function initialize(address _owner) external initializer {
        _setupContractId("ChildChainManager");
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(MAPPER_ROLE, _owner);
        _setupRole(STATE_SYNCER_ROLE, _owner);
    }

    /**
     * @notice Map a token to enable its movement via the PoS Portal, callable only by mappers
     * Normally mapping should happen automatically using state sync
     * This function should be used only while initial deployment when state sync is not registrered or if it fails
     * @param rootToken address of token on root chain
     * @param childToken address of token on child chain
     */
    function mapToken(address rootToken, address childToken)
    external
    override
    {
        require(hasRole(MAPPER_ROLE, _msgSender()), "must have mapper role");
        _mapToken(rootToken, childToken);
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
        require(hasRole(MAPPER_ROLE, _msgSender()), "must have mapper role");
        rootToChildToken[rootToken] = address(0);
        childToRootToken[childToken] = address(0);

        emit TokenMapped(rootToken, childToken);
    }

    function _mapToken(address rootToken, address childToken) private {
        address oldChildToken = rootToChildToken[rootToken];
        address oldRootToken = childToRootToken[childToken];

        if (rootToChildToken[oldRootToken] != address(0)) {
            rootToChildToken[oldRootToken] = address(0);
        }

        if (childToRootToken[oldChildToken] != address(0)) {
            childToRootToken[oldChildToken] = address(0);
        }

        rootToChildToken[rootToken] = childToken;
        childToRootToken[childToken] = rootToken;

        emit TokenMapped(rootToken, childToken);
    }
    //todo write deposit sync form root chain and child chain
}
