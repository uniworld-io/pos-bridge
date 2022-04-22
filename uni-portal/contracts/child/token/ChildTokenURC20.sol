pragma solidity >=0.4.4 <0.6.0;

import "../../common/URC20.sol";
import "../../common/UniAccessControl.sol";
import "./IChildToken.sol";
import "../../common/Initializable.sol";


contract ChildTokenURC20 is URC20, UniAccessControl, IChildToken, Initializable {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory _name, string memory _symbol) URC20(_name, _symbol) public{}

    function initialize(address _owner) external initializer {
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(MINTER_ROLE, _owner);
    }

    function deposit(address user, bytes memory depositData) public only(MINTER_ROLE){
        uint256 amount = abi.decode(depositData, (uint256));
        _mint(user, amount);
    }

    function withdraw(uint256 amount) public {
        _burn(_msgSender(), amount);
    }

}
