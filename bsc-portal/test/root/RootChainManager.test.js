import {deployFreshRootContracts} from "../helpers/deployer";
import * as deployer from '../helpers/deployer'


contract('RootChainManager', async (accounts) => {

    const contracts = before(async() => {
        return await deployer.deployFreshRootContracts(accounts)
    })

    describe('Register Predicate', async () =>{
        it('Register for ERC20', async () => {

        })
        it('Register for ERC721', async () => {

        })
        it('Register for Native', async () => {

        })
    })

    describe('Mapping', async () => {
        it('Mapping ERC20', async () => {

        })
        it('Mapping ERC721', async () => {

        })

        it('Mapping BNB', async () => {

        })

        it('Unmapping', async () => {

        })

    })
})
