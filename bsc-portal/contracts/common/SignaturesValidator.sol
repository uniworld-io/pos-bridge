// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./SignatureVerifier.sol";

contract SignaturesValidator is SignatureVerifier{

    address[] internal validators;
    uint8 internal minValidator;
    uint8 internal consensusRate;

    function validateSignatures(bytes calldata msg, bytes[] memory signatures) public view{
        _removeDuplicateSignature(signatures);

        bytes32 msgHash = keccak256(msg);
        uint8 countVerify = 0;
        for(uint i = 0; i < signatures.length; i++ ){
            if(signatures[i].length != 65){
                continue;
            }
            address recoverAddress = recoverSigner(msgHash, signatures[i]);
            for(uint j = 0; j < validators.length; j++){
                if(recoverAddress == validators[j]){
                    countVerify++;
                    break;
                }
            }
        }
        require(countVerify >= minValidator, "SignaturesValidator: LESS_THAN_MIN_VALIDATOR");
        require(countVerify * 100 >= validators.length * consensusRate , "SignaturesValidator: LESS_THAN_CONSENSUS_RATE");
    }

    function _removeDuplicateSignature(bytes[] memory signatures) private pure{
        require(signatures.length > 0);
        for(uint8 i = 0; i < signatures.length; i++){
            for(uint8 j = i+1; j < signatures.length; j++){
                if(keccak256(signatures[i]) == keccak256(signatures[j])){
                    delete signatures[j];
                }
            }
        }
    }
}