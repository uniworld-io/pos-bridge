import {UnichainJS} from '@uniworld/unichain-js';


const unichainJs = new UnichainJS({
   fullHost: '',
   privateKey: ''
});

unichainJs.isConnected((err, data) => {

})



const contract = unichainJs.contract().at('');
contract.Transfer().watch((error, event) => {
})
