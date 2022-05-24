// This contract is not supposed to be used in production
// It's strictly for testing purpose

pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


//@Mocktest
contract UniTestERC20 is ERC20{

    constructor(string memory name_, string memory symbol_) public ERC20(name_, symbol_){
        uint256 amount = 10**10 * (10**18);
        _mint(_msgSender(), amount);
    }

    function mint(uint256 amount) public {
        _mint(_msgSender(), amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

}
