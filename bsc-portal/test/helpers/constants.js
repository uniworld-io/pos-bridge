const bscRPC = 'http://18.141.168.229:9797';
const ethRpc = 'http://18.141.168.229:4242';

const mockValues = {

    bsc: {
        chainId: 9797,
        BNB: "0x000000000000000000000000000000000000dEaD",
        BUSD: "",
        BNFT: "",
        UNW: "",
        CENT: "",
        UNFT: "",
    },

    uni: {
        chainId: 68,
        BNB: "",
        BUSD: "",
        BNFT: "",
        UNW: "0xb4d72725cd653156208a1c21dfb43463e555a0e2",
        CENT: "",
        UNFT: "",
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
