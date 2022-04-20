pragma solidity >=0.4.4 <0.6.0;

import "./URC20.sol";
import "./UniAccessControl.sol";
import "./interface/IWrapToken.sol";

contract WrapTokenURC20 is URC20, UniAccessControl, IWrapToken {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");


    //@TODO
    constructor(
        string memory name,
        string memory symbol,
        address minter
    ) URC20(name, symbol) public{
        _setupRole(MINTER_ROLE, minter);
    }

    function mint(address user, bytes memory data) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "must have minter role");
        uint256 amount = abi.decode(data, (uint256));
        _mint(user, amount);
    }

    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }

}
