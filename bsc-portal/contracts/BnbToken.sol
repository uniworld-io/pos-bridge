// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


contract BnbToken is ERC20Burnable {
    constructor() ERC20("BNB token", "BNB") public {
        _mint(_msgSender(), 250000000 * 10**18);
    }
}
