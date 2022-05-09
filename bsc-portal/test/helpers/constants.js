const rootRPC = 'http://18.141.168.229:9797';
const childRPC = 'http://18.141.168.229:4242';

const mockValues = {

    rootChainId: 9797,
    childChainId: 4242,

    consensusRate: 50,
    minValidators: 1,

    childChainManager: '0x8c2ABBBC9514E14F4FCD4bf47dCcDE00437e2e34',
    childTokenErc20: '0x0B545b1940B9D24c617248635D00217a490921f4',

    rootChainManager: '0x8456B5e675ecCCB1947Ca22f4946C4e4D9f357Cc',
    erc20Predicate: '0x3A2A1358F5fFDA0Becefa5159D0fECE1C90f611C',
    rootTokenErc20:'0xA0699E3d2bA6186F75c2d8A1Aa6A348347bF9Dbd',


    accounts:[
        '0xd5ef7a24bd2aa0872b16278017f4d1258b1c3deb',
        '0x672b8515E5B5baFf4a5C51a0482eeac5baa9e457',
        '0xD5EF7A24BD2Aa0872b16278017F4d1258b1c3deb',
        '0x3ca8b76a67Aa25482dCd70cAbfc05561f8F67fd3',
    ],

    validators:[
        '0x4b194A3fdd790c31C0559b221f182eEdC049be3f',
        '0xc0e370c9D7b37Ba906b6E853DdE9Af13b1728bD6'
    ],
    privateKeys:{
        validator1:'d286347fe9763680ef8c7ea48c9754df6458dae8cc01e4f62dcdaf37686a96cc'
    },

    amounts:[
        1000,
        2000
    ]

}
module.exports = {
    rootRPC,
    childRPC,
    mockValues
}