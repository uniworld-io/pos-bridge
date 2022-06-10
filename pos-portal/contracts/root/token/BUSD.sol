// This contract is not supposed to be used in production
// It's strictly for testing purpose

pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


//@Mocktest
contract BUSD is ERC20{

    constructor() public ERC20("Root test udt", "BUSD"){
        uint256 amount = 10**10 * (10**18);
        _mint(_msgSender(), amount);
    }

    function mint(address user, uint256 amount) public {
        _mint(user, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

}
