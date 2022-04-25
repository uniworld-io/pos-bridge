import {RootChainService} from "./service/RootChainService";
import {ChildChainService} from "./service/ChildChainService";

const rootChainService = new RootChainService();
const childChainService = new ChildChainService();

rootChainService.start()
childChainService.start();

