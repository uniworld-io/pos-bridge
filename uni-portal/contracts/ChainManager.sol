pragma solidity >=0.4.4 <0.6.0;

import "./interface/IChainManager.sol";
import "./common/UniAccessControl.sol";

contract ChainManager is IChainManager, UniAccessControl{
    mapping(address => bytes32) public tokenToType;
    mapping(bytes32 => address) public typeToPredicate;
    mapping(uint => mapping(address => address)) srcToDstToken;
    mapping(uint => mapping(address => address)) dstToSrcToken;


    address[] private validators;
    uint8 private minValidator;
    uint8 private consensusRate;

    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    bytes32 public constant MAP_TOKEN = keccak256("MAP_TOKEN");
    bytes32 public constant MAP_ROLE = keccak256("MAP_ROLE");


    constructor(address admin, uint8 _consensusRate, uint8 _minValidator, address[] _initValidator) public{
        consensusRate = _consensusRate;
        minValidator = _minValidator;
        validators = _initValidator;
        _setupRole(ADMIN_ROLE, admin);
        _setupRole(MAPPER_ROLE, admin);
    }

    function mapToken(uint srcChainId, address srcToken, uint dstChainId, address dstToken) external only(MAP_ROLE){
        require(
            srcToDstToken[srcChainId][srcToken] == address(0) &&
            dstToSrcToken[dstChainId][dstToken] == address(0),
            "srcChainManager: ALREADY_MAPPED"
        );
        _mapToken(tokenType, srcChainId, srcToken, dstChainId, dstToken);
    }

    function _mapToken(uint srcChainId, address srcToken, uint dstChainId, address dstToken) private {
        require(
            typeToPredicate[tokenType] != address(0x0),
            "srcChainManager: TOKEN_TYPE_NOT_SUPPORTED"
        );
        srcToDstToken[srcChainId][srcToken] = dstToken;
        dstToSrcToken[dstChainId][dstToken] = srcToken;
        tokenToType[srcToken] = tokenType;

        emit TokenMapped(tokenType, srcChainId, srcToken, dstChainId, dstToken);
    }


    function unmapToken(uint srcChainId, address srcToken, uint dstChainId, address dstToken) external only(MAP_ROLE){
        srcToDstToken[srcChainId][srcToken] = address(0);
        dstToSrcToken[dstChainId][dstToken] = address(0);
        tokenToType[srcToken] = bytes32(0);
        emit TokenMapped(srcChainId, srcToken, dstChainId, dstToken);
    }

    //@TODO
    function registerPredicate(bytes32 tokenType, address predicateAddress) public onlyAdmin {
        typeToPredicate[tokenType] = predicateAddress;
        emit PredicateRegistered(tokenType, predicateAddress);
    }

    function validatorChanged(address validator, bytes calldata data) public onlyAdmin{
        //@TODO
    }


}