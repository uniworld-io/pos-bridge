//
// ###################### For web3, BSC or ETH
// var ${data}
// var ${value}
// var ${chainId}
// var ${contract_address}
//
// --------------------------DEPOSIT from BSC----------------
//     ${contract_address} = address of root manager
//
//
//     #Deposit native coin
//
//     ${value} = imput from user
//     ${data} =
//     web3.eth.abi.encodeFunctionCall({
//         name: 'depositNativeFor',
//         type: 'function',
//         inputs: [{
//             type: 'address',
//             name: 'user'
//         }]
//     }, ['${receiver address UNI chain}]']); //0x2cd344....
//
//     #Deposit ERC20 token
//
//     ${value} = 0x00
//     ${data} =
//     web3.eth.abi.encodeFunctionCall({
//         name: 'depositFor',
//         type: 'function',
//         inputs: [
//             {
//                 type: 'address',
//                 name: 'receiver'
//             },
//             {
//                 type: 'address',
//                 name: 'rootToken'
//             },
//             {
//                 type: 'uint32',
//                 name: 'childChainId'
//             },
//             {
//                 type: 'bytes',
//                 name: 'depositData'
//             }
//             ]
//     }, [
//         '${receiver address UNI chain}]',
//         '${address of token at bsc chain}',
//         '${childChainId}',//UNI: 68||130,
//         '${depositData}'
//     ]); //0x2cd344....
//
//     ${depositData] =
//     web3.eth.abi.encodeParameter('uint256', '${input from user}');
//
//     #Deposit ERC 721
//
//     const callUriHex = web3.eth.abi.encodeFunctionCall({
//     name: 'tokenURI',
//     type: 'function',
//     inputs: [{
//     type: 'uint256',
//     name: 'tokenId'
//     }]
//     }, ['${tokenId from User}']);
//
//     ${uri} = web3.eth.call({
//     to: ${rootTokenAddress},
//     data: ${callUriHex}
//     })
//
//     ${depositData] = web3.eth.abi.encodeParameters(['uint256','string'], ['${tokenId from user input}', '${uri}']);
//
//
//     ${value} = 0x00
//     ${contract_address} = address of root manager
//     ${data} =
//     web3.eth.abi.encodeFunctionCall({
//         name: 'depositFor',
//         type: 'function',
//         inputs: [
//             {
//                 type: 'address',
//                 name: 'receiver'
//             },
//             {
//                 type: 'address',
//                 name: 'rootToken'
//             },
//             {
//                 type: 'uint32',
//                 name: 'childChainId'
//             },
//             {
//                 type: 'bytes',
//                 name: 'depositData'
//             }
//         ]
//     }, [
//         '${receiver address UNI chain}]',
//         '${address of token at bsc chain}',
//         '${childChainId}',//UNI: 68||130,
//         '${depositData}'
//     ]); //0x2cd344....
//
//
// --------------------------WITHDRAW from BSC----------------
//     ${value} = 0x00
//     ${contract_address} = address of child manager
//
//     #### Native coin
//     ${withdrawData} = web3.eth.abi.encodeParameter('uint256', '${input from user}');
//
//     #### ERC20 token
//     ${withdrawData} = web3.eth.abi.encodeParameter('uint256', '${input from user}');
//
//     #### ERC721 NFT
//     ${withdrawData} = web3.eth.abi.encodeParameter('uint256', '${tokenId from user}');
//
//
//     ${data} = ${data} =
//     web3.eth.abi.encodeFunctionCall({
//         name: 'withdraw',
//         type: 'function',
//         inputs: [
//             {
//                 type: 'address',
//                 name: 'withdrawer'
//             },
//             {
//                 type: 'address',
//                 name: 'childToken'
//             },
//             {
//                 type: 'bytes',
//                 name: 'withdrawData'
//             }
//         ]
//     }, [
//         '${withdrawer address UNI chain}]',
//         '${address of child token at bsc chain}',
//         '${withdrawData}'
//     ]); //0x2cd344....
//
//
//
//
//
// /////////META MASK call
// const transactionParameters = {
//     nonce: '0x00', // ignored by MetaMask
//     gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//     gas: '0x2710', // customizable by user during MetaMask confirmation.
//     to: ${contract_address}  , // Required except during contract publications.
//     from: ethereum.selectedAddress, // must match user's active address.
//     value: ${value}, // Only required to send ether to the recipient from the initiating external account.
//     data: ${data},// Optional, but used for defining smart contract creation and interaction.
//     chainId: ${chainId}, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
// };
//
// // txHash is a hex string
// // As with any RPC call, it may throw an error
// const txHash = await ethereum.request({
//     method: 'eth_sendTransaction',
//     params: [transactionParameters],
// });