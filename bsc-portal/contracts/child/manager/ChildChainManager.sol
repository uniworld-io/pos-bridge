// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./IChildChainManager.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../token/IChildToken.sol";
import "../../common/AccessControlUni.sol";
import "../../common/SignaturesValidator.sol";


contract ChildChainManager is IChildChainManager, AccessControlUni, Initializable, SignaturesValidator {
    mapping(uint32 => mapping(address => address)) rootToChildToken;
    mapping(address => address) childToRootToken;
    uint32 childChainId;

    event WithdrawExecuted(uint32 childChainId, uint32 rootChainId, address childToken, address burner, address withdrawer, bytes value);


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

        emit TokenMapped(rootChainId, rootToken, childChainId, childToken);
    }

    function unmapToken(address childToken, uint32 rootChainId, address rootToken) override external {
        rootToChildToken[rootChainId][rootToken] = address(0);
        childToRootToken[childToken] = address(0);
        emit TokenMapped(rootChainId, rootToken, childChainId, childToken);
    }

    function withdraw(address withdrawer, address childToken, uint32 rootChainId, bytes calldata withdrawData) override external {
        require(childToRootToken[childToken] != address(0), "ChildChainManager: TOKEN_NOT_MAPPED");
        IChildToken(childToken).withdraw(withdrawer, withdrawData);
        emit WithdrawExecuted(childChainId, rootChainId, childToken, _msgSender(), withdrawer, withdrawData);
    }

    function depositExecuted(bytes calldata msg, bytes[] memory signatures) public {
        validateSignatures(msg, signatures);

        (uint32 rootChainId, address rootToken,  address user, bytes memory depositData)
        = abi.decode(msg, (uint32, address, address, bytes));

        address childToken = rootToChildToken[rootChainId][rootToken];
        require(childToken != address(0), "ChildChainManager: TOKEN_NOT_MAPPED");

        IChildToken childContract = IChildToken(childToken);
        childContract.deposit(user, depositData);
    }

    function validatorChanged(uint8 consensusRate_, uint8 minValidator_, address[] memory validators_)
    override external only(DEFAULT_ADMIN_ROLE) {
        consensusRate = consensusRate_;
        minValidator = minValidator_;
        validators = validators_;
    }


}