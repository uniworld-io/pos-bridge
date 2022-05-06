// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./IRootChainManager.sol";
import "../../common/Initializable.sol";
import "../predicate/ITokenPredicate.sol";
import "../../common/AccessControlUni.sol";
import "../../common/SignaturesValidator.sol";

contract RootChainManager is IRootChainManager, AccessControlUni, Initializable, SignaturesValidator {
    mapping(address => address) rootToChildToken;
    mapping(uint32 => mapping(address => address)) childToRootToken;
    mapping(bytes32 => address) typeToPredicate;
    mapping(address => bytes32) tokenToType;

    uint32 rootChainId;
    
    bytes32 public constant MAP_TOKEN = keccak256("MAP_TOKEN");
    bytes32 public constant MAPPER_ROLE = keccak256("MAPPER_ROLE");

    event DepositExecuted(uint32 rootChainId, uint32 childChainId, address rootToken, address depositor, address receiver, bytes value);
    event PredicateRegistered(bytes32 tokenType, address tokenAddress);
    event ValidatorChanged(address validator, bytes data);

    constructor(uint8 consensusRate_, uint8 minValidator_, address[] memory validators_, uint32 chainId_)
    SignaturesValidator(consensusRate_, minValidator_, validators_) public {
        rootChainId = chainId_;
    }

    function initialize(address _owner) external initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(MAPPER_ROLE, _owner);
    }


    function mapToken(bytes32 typeToken, address rootToken, uint32 childChainId, address childToken)
    override external only(MAPPER_ROLE) {
        require(rootToChildToken[rootToken] == address(0)
            && childToRootToken[childChainId][childToken] == address(0),
            "RootChainManager: ALREADY_MAPPED");
        _mapToken(typeToken, rootToken, childChainId, childToken);
    }

    function _mapToken(bytes32 typeToken, address rootToken, uint32 childChainId, address childToken) private {
        require(typeToPredicate[typeToken] !=address (0), "RootChainManager: TYPE_NOT_SUPPORT");

        rootToChildToken[rootToken] = childToken;
        childToRootToken[childChainId][childToken] = rootToken;
        tokenToType[rootToken] = typeToken;

        emit TokenMapped(rootChainId, rootToken, childChainId, childToken, typeToken);
    }

    function unmapToken(address rootToken, uint32 childChainId, address childToken)
    override external only(MAPPER_ROLE) {
        rootToChildToken[rootToken] = address(0);
        childToRootToken[childChainId][childToken] = address(0);
        tokenToType[rootToken] = bytes32(0);
        emit TokenMapped(rootChainId, rootToken, childChainId, childToken, tokenToType[rootToken]);
    }

    function deposit(address receiver, address rootToken, uint32 childChainId) override external payable{
        bytes memory depositData = abi.encode(msg.value);
        _depositFor(receiver, rootToken, childChainId, depositData);
    }

    function depositFor(address receiver, address rootToken, uint32 childChainId, bytes calldata depositData) override external{
        _depositFor(receiver, rootToken, childChainId, depositData);
    }

    function _depositFor(address receiver, address rootToken, uint32 childChainId, bytes memory depositData) private {

        bytes32 tokenType = tokenToType[rootToken];
        require(tokenType != 0, "RootChainManager: TOKEN_TYPE_NOT_MAPPED");
        require(rootToChildToken[rootToken] != address(0x0), "RootChainManager: TOKEN_NOT_MAPPED");

        address predicateAddress = typeToPredicate[tokenType];
        require(predicateAddress != address(0), "RootChainManager: PREDICATE_NOT_MAPPED");

        ITokenPredicate predicate = ITokenPredicate(predicateAddress);
        predicate.lockTokens(_msgSender(), rootToken, depositData);

        emit DepositExecuted(rootChainId, childChainId, rootToken, _msgSender(), receiver, depositData);
    }

    function withdrawExecuted(bytes32 digest, bytes calldata msg, bytes[] memory signatures) public {
        _validateSign(msg, signatures);

        (uint32 childChainId, address childToken, address withdrawer, bytes memory withdrawData)
        = abi.decode(msg, (uint32, address, address, bytes));

        address rootToken = childToRootToken[childChainId][childToken];
        bytes32 tokenType = tokenToType[rootToken];
        require(rootToken != address(0x0) && tokenType != 0, "RootChainManager: Token not mapped");

        address predicateAddress = typeToPredicate[tokenType];
        require(predicateAddress != address(0), "RootChainManager: Invalid token type");

        ITokenPredicate predicate = ITokenPredicate(predicateAddress);
        predicate.unlockTokens(withdrawer, rootToken, withdrawData);
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