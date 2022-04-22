// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./IChildChainManager.sol";
import "../../common/Initializable.sol";
import "../token/IChildToken.sol";
import "../../common/AccessControlUni.sol";


contract ChildChainManager is IChildChainManager, AccessControlUni, Initializable {
    mapping(uint => mapping(address => address)) rootToChildToken;
    mapping(uint => mapping(address => address)) childToRootToken;

    address[] private validators;
    uint8 private minValidator;
    uint8 private consensusRate;

    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    bytes32 public constant STATE_SYNCER_ROLE = keccak256("STATE_SYNCER_ROLE");//@Todo



//    constructor(address admin, uint8 _consensusRate, uint8 _minValidator, address[] memory _initValidator) public {
//        consensusRate = _consensusRate;
//        minValidator = _minValidator;
//        validators = _initValidator;
//    }

    function initialize(address _owner) external initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(STATE_SYNCER_ROLE, _owner);
    }

    function mapToken(uint rootChainId, address rootToken, uint childChainId, address childToken)
    override external only(DEFAULT_ADMIN_ROLE){
        _mapToken(rootChainId, rootToken, childChainId, childToken);
    }

    function _mapToken(uint rootChainId, address rootToken, uint childChainId, address childToken) private {
        address oldChildToken = rootToChildToken[rootChainId][rootToken];
        address oldRootToken = childToRootToken[childChainId][childToken];

        if (rootToChildToken[rootChainId][oldRootToken] != address(0)) {
            rootToChildToken[rootChainId][oldRootToken] = address(0);
        }

        if (childToRootToken[childChainId][oldChildToken] != address(0)) {
            childToRootToken[childChainId][oldChildToken] = address(0);
        }

        rootToChildToken[rootChainId][rootToken] = childToken;
        childToRootToken[childChainId][childToken] = rootToken;

        emit TokenMapped(rootChainId, rootToken, childChainId, childToken);

    }

    function unmapToken(uint rootChainId, address rootToken, uint childChainId, address childToken) override external {
        rootToChildToken[rootChainId][rootToken] = address(0);
        childToRootToken[childChainId][childToken] = address(0);
        emit TokenMapped(rootChainId, rootToken, childChainId, childToken);
    }

    function depositExec(bytes memory depositData) public {
        (bytes32 digest, bytes memory message, bytes[] memory signatures)
        = abi.decode(depositData, (bytes32, bytes, bytes[]));

        (address rootToken, uint rootChainId, address depositor, uint256 amount)
        = abi.decode(message, (address, uint, address, uint256));

        address childToken = rootToChildToken[rootChainId][rootToken];
        IChildToken childContract = IChildToken(childToken);
        childContract.deposit(depositor, abi.encode(amount));
    }


}