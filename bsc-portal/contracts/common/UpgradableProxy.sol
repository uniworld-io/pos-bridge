//pragma solidity ^0.8.0;
//
//import "./Proxy.sol";
//
//contract UpgradableProxy is Proxy {
//    event ProxyUpdated(address indexed _new, address indexed _old);
//    event ProxyOwnerUpdate(address _new, address _old);
//
//    //"0xd18bb9e063a0a33401afdde7f72bcae17d0931d0f071f1fabdab4da90cda9310"
//    bytes32 constant IMPLEMENTATION_SLOT = bytes32(uint256(keccak256("uniworld.proxy.implementation")) - 1);
//    //0x64d6d7545de36b005483f7dbb3c49abc7f3869f53bf183fdcb9f3cb315099483
//    bytes32 constant OWNER_SLOT = bytes32(uint256(keccak256("uniworld.proxy.owner")) - 1);
//
//    constructor(address newProxy, bytes memory _data) payable{
//        setProxyOwner(msg.sender);
//        setImplementation(newProxy);
//        if(_data.length > 0) {
//            // solhint-disable-next-line avoid-low-level-calls
//            (bool success,) = newProxy.delegatecall(_data);
//            require(success);
//        }
//    }
//
//    modifier onlyProxyOwner() {
//        require(loadProxyOwner() == msg.sender, "NOT_OWNER");
//        _;
//    }
//
//    function transferProxyOwnership(address newOwner) public onlyProxyOwner {
//        require(newOwner != address(0), "ZERO_ADDRESS");
//        emit ProxyOwnerUpdate(newOwner, loadProxyOwner());
//        setProxyOwner(newOwner);
//    }
//
//    function setProxyOwner(address newOwner) private {
//        bytes32 position = OWNER_SLOT;
//        assembly {
//            sstore(position, newOwner)
//        }
//    }
//
//    function updateImplementation(address _newProxy) public onlyProxyOwner {
//        require(_newProxy != address(0x0), "INVALID_PROXY_ADDRESS");
//        require(isContract(_newProxy), "DESTINATION_ADDRESS_IS_NOT_A_CONTRACT");
//
//        emit ProxyUpdated(_newProxy, loadImplementation());
//
//        setImplementation(_newProxy);
//    }
//
//    function setImplementation(address _newProxyTo) private {
//        bytes32 position = IMPLEMENTATION_SLOT;
//        assembly {
//            sstore(position, _newProxyTo)
//        }
//    }
//
//    function proxyOwner() internal override view returns (address) {
//        return loadProxyOwner();
//    }
//
//    function loadProxyOwner() internal view returns (address) {
//        address _owner;
//        bytes32 position = OWNER_SLOT;
//        assembly {
//            _owner := sload(position)
//        }
//        return _owner;
//    }
//
//    function implementation() internal override view returns (address) {
//        return loadImplementation();
//    }
//
//    function updateAndCall(address _newProxyTo, bytes memory data) payable public onlyProxyOwner {
//        updateImplementation(_newProxyTo);
//
//        (bool success, bytes memory returnData) = address(this).call{value : msg.value}(data);
//        require(success, string(returnData));
//    }
//
//    function loadImplementation() internal view returns (address) {
//        address _impl;
//        bytes32 position = IMPLEMENTATION_SLOT;
//        assembly {
//            _impl := sload(position)
//        }
//        return _impl;
//    }
//
//    function isContract(address _target) internal view returns (bool) {
//        if (_target == address(0)) {
//            return false;
//        }
//
//        uint256 size;
//        assembly {
//            size := extcodesize(_target)
//        }
//        return size > 0;
//    }
//}
//
