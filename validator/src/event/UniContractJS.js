
const UnichainJS = require('@uniworld/unichain-js');



export const contract = unichain.contract().at('');
contract.WithdrawExecuted().watch({filters: {}}, (error, res) => {

})

export class UniContractJS {
    constructor(serverAddress, mngAddress, abi) {
    }
}


