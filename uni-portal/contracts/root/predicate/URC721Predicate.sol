pragma solidity >=0.4.4 <0.6.0;


import "./ITokenPredicate.sol";
import "../../common/UniAccessControl.sol";
import "../../common/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";


contract URC721Predicate is ITokenPredicate, UniAccessControl, Initializable {
    using SafeERC20 for IERC20;



    function lockTokens(address depositor, address rootToken, uint256 amount, address rootChainId, address receiver) external{

    }

    function unlockTokens(address sender, address rootToken, uint256 amount, address rootChainId,  address receiver) external{

    }

}