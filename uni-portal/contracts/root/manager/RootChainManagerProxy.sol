pragma solidity >=0.4.4 <0.6.0;

import "../../common/UpgradableProxy.sol";


contract RootChainManagerProxy is UpgradableProxy {
    constructor(address _proxyTo) public UpgradableProxy(_proxyTo){}
}