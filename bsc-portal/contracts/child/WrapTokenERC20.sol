//pragma solidity ^0.8.0;
//
//import "./interfaces/IWrapToken.sol";
//import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//
//contract WrapTokenERC20 is IWrapToken, ERC20, AccessControlEnumerable {
//
//    //Todo: implement  EIP712 for sign data
//
//    bytes32 public constant DEPOSITOR_ROLE = keccak256("DEPOSITOR_ROLE");
//
//    constructor(
//        string memory name_,
//        string memory symbol_,
//        address childChainManager
//    ) ERC20(name_, symbol_) {
////        _setupContractId("WrapTokenERC20");
//
//        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
//        _setupRole(DEPOSITOR_ROLE, childChainManager);
//    }
//
//    /**
//     * @notice called when token is deposited on root chain
//     * @dev Should be callable only by WrapChainManager (Do later multi sign)
//     * Should handle deposit by minting the required amount for user
//     * Make sure minting is done only by this function
//     * @param user user address for whom deposit is being done
//     * @param depositData abi encoded amount
//     */
//    function deposit(address user, bytes calldata depositData)
//    external
//    override
//    {
//        require(hasRole(DEPOSITOR_ROLE, _msgSender()), "must have depositor role");
//
//        uint256 amount = abi.decode(depositData, (uint256));
//        _mint(user, amount);
//    }
//
//    /**
//     * @notice called when user wants to withdraw tokens back to root chain
//     * @dev Should burn user's tokens. This transaction will be verified when exiting on root chain
//     * @param amount amount of tokens to withdraw
//     */
//    function withdraw(uint256 amount) external {
//        _burn(_msgSender(), amount);
//    }
//}
