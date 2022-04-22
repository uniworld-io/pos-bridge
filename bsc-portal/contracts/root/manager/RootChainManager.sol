// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./IRootChainManager.sol";
import "../../common/Initializable.sol";
import "../predicate/ITokenPredicate.sol";
import "../../common/AccessControlUni.sol";
import "../../common/ManagerValidator.sol";

contract RootChainManager is IRootChainManager, AccessControlUni, Initializable, ManagerValidator {
    mapping(uint => mapping(address => address)) rootToChildToken;
    mapping(uint => mapping(address => address)) childToRootToken;
    mapping(bytes32 => address) typeToPredicate;
    mapping(address => bytes32) tokenToType;

    bytes32 public constant MAP_TOKEN = keccak256("MAP_TOKEN");
    bytes32 public constant MAPPER_ROLE = keccak256("MAPPER_ROLE");

    event DepositedExecuted(uint rootChainId, address rootToken, address depositor, address receiver, uint256 value);

    constructor(uint8 consensusRate_, uint8 minValidator_, address[] memory validators_)
    ManagerValidator(consensusRate_, minValidator_, validators_) public {
    }

    function initialize(address _owner) external initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(MAPPER_ROLE, _owner);
    }

    event PredicateRegistered(bytes32 tokenType, address tokenAddress);
    event ValidatorChanged(address validator, bytes data);

    function mapToken(bytes32 typeToken, uint rootChainId, address rootToken, uint childChainId, address childToken)
    override external only(MAPPER_ROLE) {
        require(rootToChildToken[rootChainId][rootToken] != address(0)
            && childToRootToken[childChainId][childToken] != address(0),
            "Already mapped token");
        _mapToken(typeToken, rootChainId, rootToken, childChainId, childToken);
    }

    function _mapToken(bytes32 typeToken, uint rootChainId, address rootToken, uint childChainId, address childToken) private {
        require(tokenToType[rootToken] != bytes32(0), "RootChainManager: Type token not supported");
        rootToChildToken[rootChainId][rootToken] = childToken;
        childToRootToken[childChainId][childToken] = rootToken;
        tokenToType[rootToken] = typeToken;
        emit TokenMapped(rootChainId, rootToken, childChainId, childToken, typeToken);
    }

    function unmapToken(uint rootChainId, address rootToken, uint childChainId, address childToken)
    override external only(MAPPER_ROLE) {
        rootToChildToken[rootChainId][rootToken] = address(0);
        childToRootToken[childChainId][childToken] = address(0);
        tokenToType[rootToken] = bytes32(0);
        emit TokenMapped(rootChainId, rootToken, childChainId, childToken, tokenToType[rootToken]);
    }

    function deposit(bytes calldata depositData) public {
        (uint rootChainId, address rootToken, address depositor, address receiver, uint256 value)
        = abi.decode(depositData, (uint, address, address, address , uint));

        require(depositor != address(0), "Depositor address invalid");

        bytes32 tokenType = tokenToType[rootToken];
        require(rootToChildToken[rootChainId][rootToken] != address(0) && tokenType != 0, "RootChainManager: Token not mapped");

        address predicateAddress = typeToPredicate[tokenType];
        require(predicateAddress != address(0), "RootChainManager: Invalid token type");

        ITokenPredicate predicate = ITokenPredicate(predicateAddress);
        predicate.lockTokens(depositor, rootToken, value);

        emit DepositedExecuted(rootChainId, rootToken, depositor, receiver, value);
    }

    function withdrawExec(bytes calldata withdrawData) public {
        (bytes32 digest, bytes memory message, bytes[] memory signatures)
        = abi.decode(withdrawData, (bytes32, bytes, bytes[]));

        require(_validateSign(digest, signatures), "RootChainManager: Group sign not accepted withdraw");

        (uint childChainId, address childToken, address withdrawer, uint256 value)
        = abi.decode(message, (uint, address, address, uint256));

        address rootToken = childToRootToken[childChainId][childToken];

        bytes32 tokenType = tokenToType[rootToken];
        require(rootToken != address(0) && tokenType != 0, "RootChainManager: Token not mapped");

        address predicateAddress = typeToPredicate[tokenType];
        require(predicateAddress != address(0), "RootChainManager: Invalid token type");

        ITokenPredicate predicate = ITokenPredicate(predicateAddress);
        predicate.unlockTokens(withdrawer, rootToken, value);
    }

    function registerPredicate(bytes32 tokenType, address predicateAddress) public only(DEFAULT_ADMIN_ROLE) {
        typeToPredicate[tokenType] = predicateAddress;
        emit PredicateRegistered(tokenType, predicateAddress);
    }


    function validatorChanged(address validator, address validatorPk, bytes[] memory signatures)
    external only(DEFAULT_ADMIN_ROLE){
        //@TODo
    }

    receive() external payable {
        //@TODo
    }
}