const rootRPC = 'http://18.141.168.229:9797';
const childRPC = 'http://18.141.168.229:4242';

const mockValues = {

    rootChainId: 9797,
    childChainId: 4242,

    consensusRate: 60,
    minValidators: 1,

    childChainManager: '0xE35E92df298a7483f536833305B5f1A6c1aF374F',
    childTokenErc20: '0x5f24638c2AA003c31cfccEf706ed130bCb3Eb566',

    rootChainManager: '0x5a7340FA7f867d709304787bD9932a847f2e568c',
    erc20Predicate: '0x12E780a5A698b5f5c9F1ce1D29625c9fb7C1fa8E',
    rootTokenErc20:'0xEA28B50F0E402B4c7aB980658626B815CCe43832',


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