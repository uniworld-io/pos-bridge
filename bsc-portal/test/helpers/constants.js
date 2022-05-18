const rootRPC = 'http://18.141.168.229:9797';
const childRPC = 'http://18.141.168.229:4242';

const mockValues = {

    bsc: {
        chainId: 97,
        predicate: {
            native: '0x32444db7378c4A124536B592b0b93b4BAce2846f',
            erc20: '0x7F0E1F065811A7E58CbC9fa70300f131EFed6c06',
            erc721: '0xA2853066f71e87dbE06d47A2E24BA04162bceCf3'
        },
        token: {
            native: '0x000000000000000000000000000000000000dEaD',
            wunw: '0xBA40c0B27017e60050dD4A9D3Eadef5736B634f7',
            weth: '0x99Be24b8D22D79e945792D2942816dd52969f9C2'
        },
        manager: {
            root_proxy: '0x11247CF68D548947e492c0412b399FC3E4560D7F',
            child_proxy: '0xdea1332e5DAdfe20f029D37046AC46CC133D765E',
        },
    },

    uni: {
        chainId: 68,
        predicate: {
            native: '0x44b4d72725cd653156208a1c21dfb43463e555a0e2',
            erc20: '0x44e3cc20e8ed7024b382942f55084c97885af3ddac',
            erc721: '0x44d1cc7d4af6b7a4df3f34396406f8fce2333627eb',
        },

        token: {
            native: '0x16748f8d05163e917388fa79050bafe5a30faa2f',
            wbnb: '0xc24c477786d49f148dd5bcac8107cc79bf0f9c36',
        },

        manager: {
            admin: '0x44FFF11519410945baAe942B9b8dA46eb1aECf7897',
        },
    },
    token_type:{
        erc20: '0x8ae85d849167ff996c04040c44924fd364217285e4cad818292c7ac37c0a345b',//ERC20,
        erc721: '0x73ad2146b3d3a286642c794379d750360a2d53a3459a11b3e5d6cc900f55f44a',//ERC721
        erc1155: '0x973bb64086f173ec8099b7ed3d43da984f4a332e4417a08bc6a286e6402b0586',//ERC1155
        bnb: '0x3ed03c38e59dc60c7b69c2a4bf68f9214acd953252b5a90e8f5f59583e9bc3ae',//BNB
        eth: '0xaaaebeba3810b1e6b70781f14b2d72c1cb89c0b2b320c43bb67ff79f562f5ff4',//ETH,
    },
    eth: {
        chainId: 42,
        predicate: {
            native: '',
            erc20: ''
        },

        token: {
            native: '0x000000000000000000000000000000000000dEaD',
            erc20: {
                root: '',
                wunw: '',
            }
        },

        manager: {
            root_proxy: '',
            child_proxy: '',
        },
    },
    consensusRate: 50,
    minValidators: 1,

    accounts: [
        '0xD5EF7A24BD2Aa0872b16278017F4d1258b1c3deb',
        '0x672b8515E5B5baFf4a5C51a0482eeac5baa9e457',
        '0x1eABA7D736f85D723730f71c2D9322c1c82be0eB',
        '0x4B58913337d93BE4755072E3d0F45Ca942E11751',
    ],

    validators: [
        '0x4b194A3fdd790c31C0559b221f182eEdC049be3f',
        '0xc0e370c9D7b37Ba906b6E853DdE9Af13b1728bD6'
    ],
    privateKeys: {
        validator1: 'd286347fe9763680ef8c7ea48c9754df6458dae8cc01e4f62dcdaf37686a96cc'
    },

    amounts: [
        1000,
        2000
    ],

}
module.exports = {
    rootRPC,
    childRPC,
    mockValues
}