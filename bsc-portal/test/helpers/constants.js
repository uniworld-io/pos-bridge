const rootRPC = 'http://18.141.168.229:9797';
const childRPC = 'http://18.141.168.229:4242';

const mockValues = {

    bsc:{
        chainId: 9797,

        rootTokenErc20: '0x7488EAFF3632A4Cc413c2F9a04c970ca972dc97C',
        predicateErc20: '0x945244e38DB5909506AFF3de24ccAB25911cb713',
        rootChainManager: '0xdE1e2bd624D7e1A6e31d67A6108dDB3455227123',
        rootChainManagerProxy: '0x21141CFED11E08826ED40d9f29B4f37DE8F15674',

        childChainManagerProxy: '0x9583E8628822Ad6A78b3280C82F70E9E2c33e1D3',
        ethWrapToken: '0x1124E6E45c0D5460D65aBceB964dF6b5e10B98F4',
    },

    eth:{
        chainId: 4242,

        rootTokenErc20: '0xbdaC406241Af52f60bC7C03A28aF04130e11Bf81',
        predicateErc20: '0xd2Cc05f28B92C68512B35a4f26D0561F68F0db00',
        rootChainManager: '0x0051700454a1A76e6C9d653453232a574ba5a61d',
        rootChainManagerProxy: '0x5391fD6ee15bB44FAeAb126dA104180A9C4adc76',

        childChainManagerProxy: '0xB42957772af34BfCeb8Bf05212B1164A8cA08E04',
        bnbWrapToken: '0x221B857710B314BEff8E635156B73f59c38C83C2',
    },

    consensusRate: 50,
    minValidators: 1,

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
    ],
    erc20Type: '0x8ae85d849167ff996c04040c44924fd364217285e4cad818292c7ac37c0a345b'

}
module.exports = {
    rootRPC,
    childRPC,
    mockValues
}