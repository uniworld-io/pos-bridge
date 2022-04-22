

contract ManagerValidator {

    address[] internal validators;
    uint8 internal minValidator;
    uint8 internal consensusRate;

    constructor(uint8 consensusRate_, uint8 minValidator_, address[] memory validators_){
        consensusRate = consensusRate_;
        minValidator = minValidator_;
        validators = validators_;
    }

    function _validateSign(bytes32 digest, bytes[] memory signatures) internal returns(bool){
        //@TODo
        return true;
    }

}