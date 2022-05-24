// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./IRootChainManager.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../predicate/ITokenPredicate.sol";
import "../../common/AccessControlUni.sol";
import "../../common/SignaturesValidator.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract EthRootChainManager is IRootChainManager, AccessControlUni, Initializable, SignaturesValidator {
    mapping(address => address) public rootToChildToken;
    mapping(uint32 => mapping(address => address)) public childToRootToken;
    mapping(bytes32 => address) public typeToPredicate;
    mapping(address => bytes32) public tokenToType;

    uint32 public rootChainId;

    bytes32 public constant MAP_TOKEN = keccak256("MAP_TOKEN");
    bytes32 public constant MAPPER_ROLE = keccak256("MAPPER_ROLE");
    address public constant ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    event DepositExecuted(uint32 rootChainId, uint32 childChainId, address rootToken, address depositor, address receiver, bytes depositData);
    event PredicateRegistered(bytes32 tokenType, address tokenAddress);
    event ValidatorChanged(address validator, bytes data);

    function initialize(uint8 consensusRate_, uint8 minValidator_, address[] memory validators_, uint32 chainId_, address _owner) external initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(MAPPER_ROLE, _owner);
        rootChainId = chainId_;

        consensusRate = consensusRate_;
        minValidator = minValidator_;
        validators = validators_;
        _setupContractId("RootChainManager");
    }

    /**
   * @notice Deposit ether by directly sending to the contract
     * The account sending ether receives WBNB on child chain
     */
    receive() external payable {
        _msgSender().call{value: msg.value}("");
    }

    function mapToken(bytes32 typeToken, address rootToken, uint32 childChainId, address childToken) override external only(MAPPER_ROLE) {
        require(
            rootToChildToken[rootToken] == address(0) &&
            childToRootToken[childChainId][childToken] == address(0),
            "RootChainManager: ALREADY_MAPPED"
        );
        _mapToken(typeToken, rootToken, childChainId, childToken);
    }

    function _mapToken(bytes32 typeToken, address rootToken, uint32 childChainId, address childToken) private {
        require(typeToPredicate[typeToken] != address(0), "RootChainManager: TYPE_NOT_SUPPORT");

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

    function depositNativeFor(address receiver, uint32 childChainId) external payable{
        _depositNativeFor(receiver, childChainId);
    }


    function _depositNativeFor(address receiver, uint32 childChainId) private {
        // payable(typeToPredicate[tokenToType[BNB_ADDRESS]]).transfer(msg.value);
        // transfer doesn't work as expected when receiving contract is proxified so using call
        (bool success, /* bytes memory data */) = typeToPredicate[tokenToType[ETH_ADDRESS]].call{value: msg.value}("");
        if (success) {
            bytes memory depositData = abi.encode(msg.value);
            _depositFor(receiver, ETH_ADDRESS, childChainId, depositData);
        }else{
            revert("RootChainManager: BNB_TRANSFER_FAILED");
        }
    }


    function depositFor(address receiver, address rootToken, uint32 childChainId, bytes calldata depositData) override external{
        _depositFor(receiver, rootToken, childChainId, depositData);
    }

    function _depositFor(address receiver, address rootToken, uint32 childChainId, bytes memory depositData) private {
        require(rootToChildToken[rootToken] != address(0x0), "RootChainManager: TOKEN_NOT_MAPPED");

        bytes32 tokenType = tokenToType[rootToken];
        require(tokenType != 0, "RootChainManager: TOKEN_TYPE_NOT_MAPPED");

        address predicateAddress = typeToPredicate[tokenType];
        require(predicateAddress != address(0), "RootChainManager: PREDICATE_NOT_MAPPED");

        require(receiver != address(0), "RootChainManager: RECEIVER_INVALID");

        ITokenPredicate(predicateAddress).lockTokens(_msgSender(), rootToken, depositData);

        emit DepositExecuted(rootChainId, childChainId, rootToken, _msgSender(), receiver, depositData);
    }

    function withdrawExecuted(bytes calldata msg, bytes[] memory signatures) public {
        validateSignatures(msg, signatures);

        (uint32 childChainId, uint32 rootChainId_, address childToken, address withdrawer, bytes memory withdrawData)
        = abi.decode(msg, (uint32, uint32, address, address, bytes));

        require(rootChainId_ == rootChainId, "RootChainManager: NOT_MATCH_ROOT_CHAIN");

        address rootToken = childToRootToken[childChainId][childToken];
        bytes32 tokenType = tokenToType[rootToken];
        require(rootToken != address(0x0) && tokenType != 0, "RootChainManager: Token not mapped");

        address predicateAddress = typeToPredicate[tokenType];
        require(predicateAddress != address(0), "RootChainManager: Not found predicate");

        ITokenPredicate(predicateAddress).unlockTokens(withdrawer, rootToken, withdrawData);
    }

    function registerPredicate(bytes32 tokenType, address predicateAddress) override external only(DEFAULT_ADMIN_ROLE) {
        typeToPredicate[tokenType] = predicateAddress;
        emit PredicateRegistered(tokenType, predicateAddress);
    }

    function validatorChanged(uint8 consensusRate_, uint8 minValidator_, address[] memory validators_) external only(DEFAULT_ADMIN_ROLE) {
        consensusRate = consensusRate_;
        minValidator = minValidator_;
        validators = validators_;
    }
}
