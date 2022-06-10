require('dotenv').config();

const UnichainJs = require('@uniworld/unichain-js')
const utils = require('./utils')
module.exports = async (deployer, network) => {
    const contractAddresses = utils.getContractAddresses(network)
    const unichain = new UnichainJs({
        fullHost: process.env.UNI_HOST
    });
    const privateKeyAdmin = utils.uni.admin.privateKey;
    const admin = unichain.address.toHex(unichain.address.fromPrivateKey(privateKey));

    //Create token urc 20
    //CREATE WRAP BNB TOKEN
    const paramCreateWBNB = {
        symbol: 'BNB',
        name: 'WrapBNB',
        decimals: 18,
        max_supply: 1000000000000000000000,
        total_supply: 1,
        start_time: null,
        end_time: null,
        url: 'https://binance.org',
        fee: 1,
        extra_fee_rate: 1,
        fee_pool: 10000000,
        burned: 0,
        latest_operation_time: null,
        lot: 1,
        fee_pool_origin: 1,
        exch_unx_num: 1,
        exch_num: 1,
        exch_enable: false,
        critical_update_time: null,
        create_acc_fee: 10
    }

    const createBNB = await unichain.transactionBuilder(admin, paramCreateWBNB)
    const signedTxCreateBNB = await unichain.unx.signTransaction(createBNB, privateKeyAdmin, 0)
    console.log(await unichain.unx.sendRawTransaction(signedTxCreateBNB));

    //CREATE WRAP BUSD TOKEN
    const paramCreateBUSD = {
        symbol: 'BNB',
        name: 'WrapBNB',
        decimals: 18,
        max_supply: 1000000000000000000000,
        total_supply: 1,
        start_time: null,
        end_time: null,
        url: 'https://binance.org',
        fee: 1,
        extra_fee_rate: 1,
        fee_pool: 10000000,
        burned: 0,
        latest_operation_time: null,
        lot: 1,
        fee_pool_origin: 1,
        exch_unx_num: 1,
        exch_num: 1,
        exch_enable: false,
        critical_update_time: null,
        create_acc_fee: 10
    }

    const createBUSD = await unichain.transactionBuilder(admin, paramCreateBUSD)
    const signedTxCreateBUSD = await unichain.unx.signTransaction(createBUSD, privateKeyAdmin, 0)
    console.log(await unichain.unx.sendRawTransaction(signedTxCreateBUSD));

    //CREATE CENT TOKEN
    const paramCreateCENT = {
        symbol: 'BNB',
        name: 'WrapBNB',
        decimals: 18,
        max_supply: 1000000000000000000000,
        total_supply: 1,
        start_time: null,
        end_time: null,
        url: 'https://binance.org',
        fee: 1,
        extra_fee_rate: 1,
        fee_pool: 10000000,
        burned: 0,
        latest_operation_time: null,
        lot: 1,
        fee_pool_origin: 1,
        exch_unx_num: 1,
        exch_num: 1,
        exch_enable: false,
        critical_update_time: null,
        create_acc_fee: 10
    }

    const createCENT = await unichain.transactionBuilder(admin, paramCreateCENT)
    const signedTxCreateCENT = await unichain.unx.signTransaction(createCENT, privateKeyAdmin, 0)
    console.log(await unichain.unx.sendRawTransaction(signedTxCreateCENT));



    //////CREATE NFT
    const createUNFT = await unichain.urc721Create(admin, 'UNFT', 'Uni NFT', 1000, null);
    const signedTxCreateUnft = await unichain.unx.signTransaction(createUNFT, privateKeyAdmin, 0)
    console.log(await unichain.unx.sendRawTransaction(signedTxCreateUnft));

    const createWBNFT = await unichain.urc721Create(admin, 'BNFT', 'Wrap BNFT', 1000, null);
    const signedTxCreateBnft = await unichain.unx.signTransaction(createWBNFT, privateKeyAdmin, 0)
    console.log(await unichain.unx.sendRawTransaction(signedTxCreateBnft));
}
