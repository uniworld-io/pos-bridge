// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;
import "./IChildToken.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../../common/AccessControlUni.sol";

contract ChildTokenERC20 is ERC20, AccessControlUni, IChildToken, Initializable {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        address childChainManager
    ) public ERC20(name_, symbol_) {
        _setupContractId("ChildERC20");
//        _setupDecimals(decimals_);
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, childChainManager);
        _setupRole(BURNER_ROLE, childChainManager);
    }

    function deposit(address user, bytes calldata depositData) override external only(MINTER_ROLE){
        uint256 amount = abi.decode(depositData, (uint256));
        _mint(user, amount);
    }

    function withdraw(address user, bytes calldata withdrawData) override external only(BURNER_ROLE){
        uint256 amount = abi.decode(withdrawData, (uint256));
        _burn(user, amount);
    }


}
