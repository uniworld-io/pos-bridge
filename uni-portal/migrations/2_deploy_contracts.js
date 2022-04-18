var ConvertLib = artifacts.require("./ConvertLib.sol");
var YourCoin = artifacts.require("./YourCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, YourCoin);
  deployer.deploy(YourCoin, 10000);
};
