
pragma solidity ^0.8.0;

abstract contract Proxy{

    //@TODO
    function _delegated(address _dst, bytes memory _calldata) internal {

        assembly {
            let result := delegatecall(
            sub(gas(), 10000), _dst, add(_calldata, 0x20), mload(_calldata), 0, 0)

            let size := returndatasize()
            let ptr := mload(0x40)
            returndatacopy(ptr, 0, size)

            switch result
            case 0 {
                revert(ptr, size)
            }
            default {
                return(ptr, size)
            }
        }
    }

    function implementation() virtual external view returns(address);

    function proxyOwner() virtual external view returns(address);
}