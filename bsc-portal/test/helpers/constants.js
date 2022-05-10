const rootRPC = 'http://18.141.168.229:9797';
const childRPC = 'http://18.141.168.229:4242';

const mockValues = {

    rootChainId: 4242,
    childChainId: 9797,

    consensusRate: 50,
    minValidators: 1,

    childChainManager: '0xac3596A0A7CaAfB518B41382f537773cE6cF34E3',
    childTokenErc20: '0x7C1809561F87e5f7C1Fb0bE2Cd8E3dfadaD41bfD',

    rootChainManager: '0xaB9a908825b95462158c106D4239F551c8850666',
    erc20Predicate: '0x38558cb8A27033862AfDca5555E809C678f267DF',
    rootTokenErc20:'0x4608b8DABd33F01a932901bA24ebB9bA7F22Ab3E',


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