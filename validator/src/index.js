const Unichain = require('@uniworld/unichain-js');

const unichainJS = new Unichain({
    fullHost: 'http://13.213.56.230:8080/',
    privateKey: '79754d6c86b81b9b1feaddad9dcd8a8b5328b336bb2b70af489921c2516b7042'
});
//
// const contract = unichain.contract().at('UUEPywwEWNgRuikMPoDqBw2i5ReD44Gr8f');
// contract.Deposited().watch((error, res) => {
//     console.log(res);
// })
//
// contract.Withdrawn().watch((error, res) => {
//     console.log(res);
// })

const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "payee",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "weiAmount",
                "type": "uint256"
            }
        ],
        "name": "Balance",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "payee",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "weiAmount",
                "type": "uint256"
            }
        ],
        "name": "Deposited",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
let contract = unichainJS.contract(abi, 'UZfrZc4Bs65inxHFdBmJRGjkaVaciLgjvF');

console.log(contract.Balance())
 contract.Balance().watch((err, event) => {
    if(err)
        return console.error('Error with "Message" event:', err);
    console.log('Event ======> ', event);
});