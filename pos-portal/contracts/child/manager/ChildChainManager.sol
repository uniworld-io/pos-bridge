// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./IChildChainManager.sol";
import "./ChildChainManagerStorage.sol";

import "../../common/Initializable.sol";

import "../token/IChildToken.sol";
import "../../common/AccessControlUni.sol";
import "../../common/SignaturesValidator.sol";


contract ChildChainManager is IChildChainManager, AccessControlUni, Initializable, SignaturesValidator, ChildChainManagerStorage{
    event WithdrawExecuted(uint32 childChainId, uint32 rootChainId, address childToken, address burner, address withdrawer, bytes withdrawData);

    function initialize(uint8 consensusRate_, uint8 minValidator_, address[] memory validators_, uint32 chainId_, address _owner) external initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        childChainId = chainId_;

        consensusRate = consensusRate_;
        minValidator = minValidator_;
        validators = validators_;
    }

    function mapToken(address childToken, uint32 rootChainId, address rootToken)
    override external only(DEFAULT_ADMIN_ROLE) {
        _mapToken(rootChainId, rootToken, childToken);
    }

    function _mapToken(uint32 rootChainId, address rootToken, address childToken) private {
        address oldChildToken = rootToChildToken[rootChainId][rootToken];
        address oldRootToken = childToRootToken[childToken];

        if (rootToChildToken[rootChainId][oldRootToken] != address(0)) {
            rootToChildToken[rootChainId][oldRootToken] = address(0);
        }

        if (childToRootToken[oldChildToken] != address(0)) {
            childToRootToken[oldChildToken] = address(0);
        }

        rootToChildToken[rootChainId][rootToken] = childToken;
        childToRootToken[childToken] = rootToken;
        rootToChainId[rootToken] = rootChainId;

        emit TokenMapped(rootChainId, rootToken, childChainId, childToken);
    }

    function unmapToken(address childToken, uint32 rootChainId, address rootToken) override external {
        rootToChildToken[rootChainId][rootToken] = address(0);
        childToRootToken[childToken] = address(0);
        rootToChainId[rootToken] = 0;
        emit TokenMapped(rootChainId, rootToken, childChainId, childToken);
    }

    function withdraw(address withdrawer, address childToken, bytes calldata withdrawData) override external {
        address rootToken = childToRootToken[childToken];
        uint32 rootChainId = rootToChainId[rootToken];
        require(rootToken != address(0) && rootChainId != 0, "ChildChainManager: ROOT_CHAIN_NOT_MAPPED");

        IChildToken(childToken).withdraw(_msgSender(), withdrawData);
        emit WithdrawExecuted(childChainId, rootChainId, childToken, _msgSender(), withdrawer, withdrawData);
    }

    function depositExecuted(bytes calldata msg, bytes[] calldata signatures) public {
        bytes32 msgHash = keccak256(msg);
        validateSignatures(msgHash, signatures);

        (string memory tx, uint32 rootChainId, uint32 childChainId_,  address rootToken,  address user, bytes memory depositData)
        = abi.decode(msg, (string, uint32, uint32, address, address, bytes));

        require(txToMsgHash[rootChainId][tx] == bytes32(0), "RootChainManager: ALREADY_TRANSACTION");
        require(childChainId == childChainId_, "ChildChainManager: NOT_MATCH_CHILD_CHAIN");

        address childToken = rootToChildToken[rootChainId][rootToken];
        require(childToken != address(0), "ChildChainManager: TOKEN_NOT_MAPPED");

        IChildToken(childToken).deposit(user, depositData);
        txToMsgHash[rootChainId][tx] = msgHash;
    }

    function validatorChanged(uint8 consensusRate_, uint8 minValidator_, address[] calldata validators_)
    override external only(DEFAULT_ADMIN_ROLE) {
        consensusRate = consensusRate_;
        minValidator = minValidator_;
        validators = validators_;
    }

    function setChainId(uint32 chainId)external only(DEFAULT_ADMIN_ROLE){
        childChainId = chainId;
    }
}
