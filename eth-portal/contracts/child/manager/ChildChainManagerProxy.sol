
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "../../common/UpgradableProxy.sol";

contract ChildChainManagerProxy is UpgradableProxy{
    constructor(address newProxy) public UpgradableProxy(newProxy){}
}
