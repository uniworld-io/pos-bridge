// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./IChildChainManager.sol";
import "../../common/Initializable.sol";
import "../token/IChildToken.sol";
import "../../common/AccessControlUni.sol";
import "../../common/SignaturesValidator.sol";


contract ChildChainManager is IChildChainManager, AccessControlUni, Initializable, SignaturesValidator {
    mapping(uint => mapping(address => address)) rootToChildToken;
    mapping(uint => mapping(address => address)) childToRootToken;

    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    bytes32 public constant STATE_SYNCER_ROLE = keccak256("STATE_SYNCER_ROLE");//@Todo

    constructor(uint8 consensusRate_, uint8 minValidator_, address[] memory validators_)
    SignaturesValidator(consensusRate_, minValidator_, validators_) public {
    }

    event WithdrawExecuted(uint childChainId, uint rootChainId, address childToken, address burner, address withdrawer, uint256 value);

    function initialize(address _owner) external initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(STATE_SYNCER_ROLE, _owner);
    }

    function mapToken(uint rootChainId, address rootToken, uint childChainId, address childToken)
    override external only(DEFAULT_ADMIN_ROLE) {
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

    function withdraw(bytes calldata withdrawData) public {
        (uint childChainId, uint rootChainId,address childToken, address burner, address withdrawer, uint256 value)
        = abi.decode(withdrawData, (uint, uint, address, address, address, uint256));

        require(burner != address(0), "Burner address invalid");

        require(childToRootToken[childChainId][childToken] != address(0), "ChildChainManager: TOKEN_NOT_MAPPED");

        IChildToken childContract = IChildToken(childToken);
        childContract.withdraw(value);

        emit WithdrawExecuted(childChainId, rootChainId, childToken, burner, withdrawer, value);
    }

    function depositExecuted(bytes32 digest, bytes calldata msg, bytes[] memory signatures) public {
        _validateSign(msg, signatures);
        (uint rootChainId, address rootToken,  address user, uint256 value)
        = abi.decode(msg, (uint, address, address, uint256));

        address childToken = rootToChildToken[rootChainId][rootToken];
        require(childToken != address(0), "ChildChainManager: TOKEN_NOT_MAPPED");

        IChildToken childContract = IChildToken(childToken);
        childContract.deposit(user, abi.encode(value));
    }

    function validatorChanged(address validator, address validatorPk, bytes[] memory signatures)
    external only(DEFAULT_ADMIN_ROLE){
        //@TODo
    }


}