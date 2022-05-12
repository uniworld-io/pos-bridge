const rootRPC = 'http://18.141.168.229:9797';
const childRPC = 'http://18.141.168.229:4242';

const mockValues = {

    bsc:{
        chainId: 9797,

        rootTokenErc20: '0xAc2A4389Ead87041482f83A5025f8219F9516dB8',
        predicateErc20: '0x6BC429a08A3dc51eC57210A809e58A1af7931B37',
        rootChainManager: '0x1CF7312e1046c4ff91dF07abAd889b67a3c2a31C',
        rootChainManagerProxy: '0x1CF7312e1046c4ff91dF07abAd889b67a3c2a31C',

        childChainManagerProxy: '0x716c5D9DC784e4A9FC3E32fAE8315B8adf9b01DB',
        childChainManager: '0x237C70105Ce27B34dFC5Bc4733044cabBF189917',
        ethWrapToken: '0xABFFe48eEa6BE6f66fbd01BD78ba52220A4E6F6f',
    },

    eth:{
        chainId: 4242,

        rootTokenErc20: '0x88D5C2d73cF34D3244f797722bD4F7c15F264410',
        predicateErc20: '0x3fe2546d4B785013951bA610BF657177Edb1564A',
        rootChainManager: '0x716c5D9DC784e4A9FC3E32fAE8315B8adf9b01DB',
        rootChainManagerProxy: '0xA17aCA91241efA4fF55DC772D5D1eEDA9E6CE2D1',

        childChainManagerProxy: '0xeDa9995fBb82ED221e43e87adf561DA2798cB4F6',
        childChainManager: '0xeDa9995fBb82ED221e43e87adf561DA2798cB4F6',
        bnbWrapToken: '0x79Aa45e8Ef1419Be485c906eC327eA0ED1B6274C',
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