const rootRPC = 'http://18.141.168.229:9797';
const childRPC = 'http://18.141.168.229:4242';

const mockValues = {

    bsc:{
        chainId: 97,

        rootTokenErc20: '0xe45E7368FA8Ca77F98291534C93d073E5aa73769',
        predicateErc20: '0x4f7c7D517eE156e04b25Cf310DCD42ED8886Ae51',
        rootChainManager: '0xb639167bd7DFA0aD783bb4a3F57DFB656e2da171',
        rootChainManagerProxy: '0xb639167bd7DFA0aD783bb4a3F57DFB656e2da171',

        childChainManagerProxy: '0x8b4BbCBf113e26B9faF62386567fdFcbe93B7bA7',
        childChainManager: '0x8b4BbCBf113e26B9faF62386567fdFcbe93B7bA7',
        ethWrapToken: '0x3092532b7Ec583bd9CA88F12Bcf9A33475028995',
        uniWrapToken: '0x75C7Df0CF14eD170d1166f6a065Ab816C1c8eB8C',
    },

    eth:{
        chainId: 42,

        rootTokenErc20: '0x12C1f59c3Fe0Bbe0f0248a4c3B0D2D9fA5C9b069',
        predicateErc20: '0x4bEeEcADa4D0077Cce370Fa90751F13DCDB49aC0',
        rootChainManager: '0x17d0eFb21Aa057EA3fF45336F8923C0007a4E592',
        rootChainManagerProxy: '0x17d0eFb21Aa057EA3fF45336F8923C0007a4E592',

        childChainManagerProxy: '0xA51af17357788d8Dd85bbC20206801D90284B184',
        childChainManager: '0xA51af17357788d8Dd85bbC20206801D90284B184',
        bnbWrapToken: '0xA06E4509d594422D36832f8aaa6B575504d710F1',
        uniWrapToken: '0xb639167bd7DFA0aD783bb4a3F57DFB656e2da171',

    },
    uni:{
        chainId: 68,

        rootTokenErc20: '0x88D5C2d73cF34D3244f797722bD4F7c15F264410',
        tokenNative: '0x16748f8d05163e917388fa79050bafe5a30faa2f',

        predicateErc20: '0x44e3cc20e8ed7024b382942f55084c97885af3ddac',
        predicateErc721: '0x44d1cc7d4af6b7a4df3f34396406f8fce2333627eb',
        predicateNative: '0x44b4d72725cd653156208a1c21dfb43463e555a0e2',

        bnbWrapToken: '0xc24c477786d49f148dd5bcac8107cc79bf0f9c36',
        ethWrapToken: '0x79Aa45e8Ef1419Be485c906eC327eA0ED1B6274C',
        admin: '0x44FFF11519410945baAe942B9b8dA46eb1aECf7897',
    },

    consensusRate: 50,
    minValidators: 1,

    accounts:[
        '0xD5EF7A24BD2Aa0872b16278017F4d1258b1c3deb',
        '0x672b8515E5B5baFf4a5C51a0482eeac5baa9e457',
        '0x1eABA7D736f85D723730f71c2D9322c1c82be0eB',
        '0x4B58913337d93BE4755072E3d0F45Ca942E11751',
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