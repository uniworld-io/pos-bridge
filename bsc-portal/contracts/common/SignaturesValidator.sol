pragma solidity ^0.8.0;

import "./SignatureVerifier.sol";

contract SignaturesValidator is SignatureVerifier{

    address[] public validators;
    uint8 public minValidator;
    uint8 public consensusRate;

    function validateSignatures(bytes calldata msg, bytes[] memory signatures) public view{
        _removeDuplicateSignature(signatures);

        bytes32 msgHash = keccak256(msg);
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
        require(countVerify / validators.length >= consensusRate / 100, "SignaturesValidator: LESS_THAN_CONSENSUS_RATE");
    }

    function _removeDuplicateSignature(bytes[] memory signatures) private pure{
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