import {RootChainService} from "./service/RootChainService";
import {ChildChainService} from "./service/ChildChainService";
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`})

const rootChainService = new RootChainService();
const childChainService = new ChildChainService();

rootChainService.start()
childChainService.start();