pragma solidity >=0.4.4 <0.6.0;

import "./UContext.sol";
import "@openzeppelin/contracts/access/roles/WhitelistedRole.sol";

contract UniAccessControl is UContext{
    mapping(bytes32 => mapping(address => bool)) roles;

    bytes32 public constant DEFAULT_AMIN_ROLE = keccak256("DEFAULT_AMIN_ROLE");

//    constructor() public {
//        roles[AMIN_ROLE][_msgSender()]=true;
//    }

    modifier only(bytes32 role){
        _checkRole(role, _msgSender());
        _;
    }

    modifier onlyAdmin(){
        _checkRole(DEFAULT_AMIN_ROLE, _msgSender());
        _;
    }

    function hasRole(bytes32 role, address account) public view returns(bool){
        return roles[role][account];
    }

    function _setupRole(bytes32 role, address account) internal {
        roles[role][account] = true;
    }

    function _checkRole(bytes32 role, address account) internal view{
        require(hasRole(role, account), "Has not permission");
    }
}