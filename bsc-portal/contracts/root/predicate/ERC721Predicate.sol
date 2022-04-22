// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "./ITokenPredicate.sol";
import "../../common/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../../common/AccessControlUni.sol";


contract ERC721Predicate is ITokenPredicate, AccessControlUni, Initializable {
    using SafeERC20 for IERC20;



    function lockTokens(address depositor, address rootToken, uint256 amount, uint rootChainId, address receiver)
    override external{
//@TODo
    }

    function unlockTokens(address burner, address rootToken, uint256 amount, uint rootChainId,  address withdrawer)
    override external{
//@TODO
    }

}