require('dotenv').config();

const UnichainJs = require('@uniworld/unichain-js')
const utils = require('./utils')
module.exports = async (deployer, network) => {

    const contractAddresses = utils.getContractAddresses(network)
    const unichain = new UnichainJs({
        fullHost: process.env.UNI_HOST
    });
    const privateKeyAdmin = utils.uni.admin.privateKey;

    //SETUP
    const admin = unichain.address.toHex(unichain.address.fromPrivateKey(privateKeyAdmin));
    const posBridgeSetup = await unichain.transactionBuilder.posBridgeSetup(
        admin,
        '',
        utils.uni.minValidators,
        utils.uni.validators,
        utils.uni.consensusRate,
        utils.uni.predicate.native,
        utils.uni.predicate.erc20,
        utils.uni.predicate.erc721
    );
    const signedTxSetUp = await unichain.unx.signTransaction(posBridgeSetup, privateKeyAdmin, 0)
    console.log(await unichain.unx.sendRawTransaction(signedTxSetUp));

    //MapRootToken
    const mapRootTokenNative =  await unichain.transactionBuilder.posBridgeMapToken(
        admin,
        utils.uni.chain_id,
        contractAddresses.root.uni.UNW,
        utils.bsc.chain_id,
        contractAddresses.child.bsc.WUNW,
        1
    )

    console.log(mapRootTokenNative);

    const mapRootTokenERC20 =  await unichain.transactionBuilder.posBridgeMapToken(
        admin,
        utils.uni.chain_id,
        contractAddresses.root.uni.CENT,
        utils.bsc.chain_id,
        contractAddresses.child.bsc.WCENT,
        2
    )
    const signedTxMapRootErc20 = await unichain.unx.signTransaction(mapRootTokenERC20, privateKeyAdmin, 0)
    console.log(await unichain.unx.sendRawTransaction(signedTxMapRootErc20));

    const mapRootTokenERC721 =  await unichain.transactionBuilder.posBridgeMapToken(
        admin,
        utils.uni.chain_id,
        contractAddresses.root.uni.UNFT,
        utils.bsc.chain_id,
        contractAddresses.child.bsc.WUNFT,
        3
    )
    const signedTxMapRootErc721 = await unichain.unx.signTransaction(mapRootTokenERC721, privateKeyAdmin, 0)
    console.log(await unichain.unx.sendRawTransaction(signedTxMapRootErc721));

    //MapChildToken
    const mapChildTokenNative =  await unichain.transactionBuilder.posBridgeMapToken(
        admin,
        utils.bsc.chain_id,
        contractAddresses.root.bsc.BNB,
        utils.uni.chain_id,
        contractAddresses.child.uni.WBNB,
        1
    )
    const signedTxMapChildNative = await unichain.unx.signTransaction(mapChildTokenNative, privateKeyAdmin, 0)
    console.log(await unichain.unx.sendRawTransaction(signedTxMapChildNative));


    const mapChildTokenERC20 =  await unichain.transactionBuilder.posBridgeMapToken(
        admin,
        utils.bsc.chain_id,
        contractAddresses.root.bsc.BUSD,
        utils.uni.chain_id,
        contractAddresses.child.uni.WBUSD,
        1
    )
    const signedTxMapChildErc20 = await unichain.unx.signTransaction(mapChildTokenERC20, privateKeyAdmin, 0)
    console.log(await unichain.unx.sendRawTransaction(signedTxMapChildErc20));


    const mapChildTokenERC721 =  await unichain.transactionBuilder.posBridgeMapToken(
        admin,
        utils.bsc.chain_id,
        contractAddresses.root.bsc.BNFT,
        utils.uni.chain_id,
        contractAddresses.child.uni.WBNFT,
        1
    )
    const signedTxMapChildErc721 = await unichain.unx.signTransaction(mapChildTokenERC721, privateKeyAdmin, 0)
    console.log(await unichain.unx.sendRawTransaction(signedTxMapChildErc721));

}
