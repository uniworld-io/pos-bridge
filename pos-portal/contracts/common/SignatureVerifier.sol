pragma solidity ^0.8.0;


contract SignatureVerifier {

//    address public owner;
//
//    constructor() public {
//        owner = msg.sender;
//    }

    function verifySignature(bytes32 hash, bytes memory signature, address signer) public pure returns (bool) {
        address addressFromSig = recoverSigner(hash, signature);
        return addressFromSig == signer;
    }

    /**
    * @dev Recover signer address from a message by using their signature
    * @param hash bytes32 message, the hash is the signed message. What is recovered is the signer address.
    * @param sig bytes signature, the signature is generated using web3.eth.sign(). Inclusive "0x..."
    */
    function recoverSigner(bytes32 hash, bytes memory sig) public pure returns (address) {
        require(sig.length == 65, "Require correct length");

        bytes32 r;
        bytes32 s;
        uint8 v;

        // Divide the signature in r, s and v variables
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }

        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }

        require(v == 27 || v == 28, "Signature version not match");

        return recoverSigner2(hash, v, r, s);
    }

    function recoverSigner2(bytes32 h, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
//        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
//        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, h));

        return ecrecover(h, v, r, s);
    }

//    function destroy() public returns (bool) {
//        require(owner == msg.sender);
//
//        selfdestruct(payable(owner));
//        return true;
//    }
}