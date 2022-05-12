//
//pragma solidity ^0.8.0;
//
//abstract contract Proxy{
//
//    //@TODO
//    function _delegated(address _impl) internal {
//
//        assembly {
//            let ptr := mload(0x40)
//
//        // (1) copy incoming call data
//            calldatacopy(ptr, 0, calldatasize())
//
//        // (2) forward call to logic contract
//            let result := delegatecall(gas, _impl, ptr, calldatasize(), 0, 0)
//            let size := returndatasize()
//
//        // (3) retrieve return data
//            returndatacopy(ptr, 0, size)
//
//        // (4) forward return data back to caller
//            switch result
//            case 0 { revert(ptr, size) }
//            default { return(ptr, size) }
//        }
//    }
//
//    fallback() external payable {
//        _delegated(implementation());
//    }
//
//    receive() external payable {
//        _delegated(implementation());
//    }
//
//    function implementation() virtual internal view returns(address);
//
//    function proxyOwner() virtual internal view returns(address);
//}