pragma solidity >=0.4.4 <0.6.0;

import "./common/UContext.sol";
import "@openzeppelin/contracts/access/roles/WhitelistedRole.sol";

contract UniAccessControl is UContext{
    mapping(bytes32 => WhitelistedRole) roles;

    bytes32 public constant AMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor() public {
        roles[AMIN_ROLE].addWhitelisted(_msgSender());
    }

    modifier onlyAdmin(){
        _checkRole(AMIN_ROLE, _msgSender());
        _;
    }

    function hasRole(bytes32 role, address account) public view returns(bool){
        return roles[role].isWhitelisted(account);
    }

    function _setupRole(bytes32 role, address account) internal onlyAdmin{
        roles[role].addWhitelisted(account);
    }

    function _checkRole(bytes32 role, address account) internal view{
        require(hasRole(role, account), "Has not permission");
    }
}