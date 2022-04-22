// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;
import "./IChildToken.sol";
import "../../common/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../../common/AccessControlUni.sol";

abstract contract ChildTokenERC20 is ERC20, AccessControlUni, IChildToken, Initializable {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

//    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) public{}

    function initialize(address _owner) external initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(MINTER_ROLE, _owner);
    }

    function deposit(address user, bytes calldata depositData) override external only(MINTER_ROLE){
        uint256 amount = abi.decode(depositData, (uint256));
        _mint(user, amount);
    }

    function withdraw(uint256 amount) public {
        _burn(_msgSender(), amount);
    }

}
