// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./IChildChainManager.sol";
import "../../common/Initializable.sol";
import "../token/IChildToken.sol";
import "../../common/AccessControlUni.sol";
import "../../common/ManagerValidator.sol";


contract ChildChainManager is IChildChainManager, AccessControlUni, Initializable, ManagerValidator {
    mapping(uint => mapping(address => address)) rootToChildToken;
    mapping(uint => mapping(address => address)) childToRootToken;

    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    bytes32 public constant STATE_SYNCER_ROLE = keccak256("STATE_SYNCER_ROLE");//@Todo

    constructor(uint8 consensusRate_, uint8 minValidator_, address[] memory validators_)
    ManagerValidator(consensusRate_, minValidator_, validators_) public {
    }

    event WithdrawExecuted(uint childChainId, address childToken, address burner, address receiver, uint256 value);


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
        (uint childChainId, address childToken, address burner, address receiver, uint256 value)
        = abi.decode(withdrawData, (uint, address, address, address, uint256));

        require(burner != address(0), "Depositor address invalid");

        IChildToken childContract = IChildToken(childToken);
        childContract.withdraw(value);

        emit WithdrawExecuted(childChainId, childToken, burner, receiver, value);
    }

    function depositExec(bytes memory depositData) public {
        (bytes32 digest, bytes memory msg, bytes[] memory signatures)
        = abi.decode(depositData, (bytes32, bytes, bytes[]));

        require(_validateSign(digest, msg, signatures), "ChildChainManager: Group sign not accepted");

        (uint rootChainId, address rootToken,  address user, uint256 value)
        = abi.decode(msg, (uint, address, address, uint256));

        address childToken = rootToChildToken[rootChainId][rootToken];
        IChildToken childContract = IChildToken(childToken);
        childContract.deposit(user, abi.encode(value));

    }

    function validatorChanged(address validator, address validatorPk, bytes[] memory signatures)
    external only(DEFAULT_ADMIN_ROLE){
        //@TODo
    }


}