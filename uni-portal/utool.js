const port = process.env.HOST_PORT || 6636

module.exports = {
  networks: {
    mainnet: {
      // Don't put your private key here:
      privateKey: process.env.PRIVATE_KEY_MAINNET,
      /*
        Create a .env file (it must be gitignored) containing something like
        export PRIVATE_KEY_MAINNET=8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f
        Then, run the migration with: source .env && utool migrate --network mainnet
      */
      userFeePercentage: 100,
      feeLimit: 1e8,
      fullHost: 'https://node.unichain.world',
      network_id: '1'
    },
    testnet: {
      privateKey: process.env.PRIVATE_KEY_TESTNET,
      userFeePercentage: 50,
      feeLimit: 1e8,
      fullHost: 'https://testnet-node.unichain.world',
      network_id: '2'
    },
    development: {
      privateKey: 'faf690f8b6ddb84c5cd0eb3c1a4d14238d415b5ded0815743fb59df3835b5f72',
      userFeePercentage: 0,
      feeLimit: 1e8,
      fullHost: 'http://127.0.0.1:' + port,
      network_id: '*'
    },
    compilers: {
      solc: {
        version: '0.5.4'
      }
    }
  }
}
