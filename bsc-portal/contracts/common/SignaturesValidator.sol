pragma solidity ^0.8.0;

import "./SignatureVerifier.sol";

contract SignaturesValidator is SignatureVerifier{

    address[] internal validators;
    uint8 internal minValidator;
    uint8 internal consensusRate;

    constructor(uint8 consensusRate_, uint8 minValidator_, address[] memory validators_){
        consensusRate = consensusRate_;
        minValidator = minValidator_;
        validators = validators_;
    }

    function _validateSign(bytes calldata msg, bytes[] memory signatures) internal{
        _removeDuplicateSignature(signatures);

        bytes32 msgHash = keccak256(abi.encodePacked(msg));
        uint8 countVerify = 0;
        for(uint i = 0; i < signatures.length; i++ ){
            if(keccak256(signatures[i]) == keccak256("")){
                continue;
            }
            address recoverAddress = recoverSigner(msgHash, signatures[i]);
            for(uint j = 0; j < validators.length; j++){
                if(recoverAddress == validators[j]){
                    countVerify++;
                }
            }
        }
        require(countVerify >= minValidator, "SignaturesValidator: LESS_THAN_MIN_VALIDATOR");
        require(countVerify / validators.length >= consensusRate, "SignaturesValidator: NOT_PASS_CONSENSUS_RATE");
    }

    function _removeDuplicateSignature(bytes[] memory signatures) internal{
        require(signatures.length > 0);
        for(uint8 i = 0; i < signatures.length; i++){
            for(uint8 j = i+1; j < i; j++){
                if(keccak256(signatures[i]) == keccak256(signatures[j])){
                    signatures[i] = "";
                }
            }
        }
    }

}