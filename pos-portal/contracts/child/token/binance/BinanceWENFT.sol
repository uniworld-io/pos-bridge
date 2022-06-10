// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;
import "../ChildTokenERC721.sol";

contract BinanceWENFT is ChildTokenERC721 {
    constructor(address childChainManager) public ChildTokenERC721("Wrap Ethereum Nft", "WENFT", childChainManager){}
}
