pragma solidity >=0.4.4 <0.6.0;

import "../../common/UpgradableProxy.sol";

contract URC20PredicateProxy is UpgradableProxy {
    constructor(address _proxyTo) public UpgradableProxy(_proxyTo){}
}