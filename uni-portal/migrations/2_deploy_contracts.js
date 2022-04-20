var WBNBToken = artifacts.require("./WBNBToken.sol");
var WETHToken = artifacts.require("./WETHToken.sol");

module.exports = function(deployer) {
  deployer.deploy(WBNBToken, "UREaEXUBfqZU7uUe79iCqrNLZmKSQH91GW");
  deployer.deploy(WETHToken, "UREaEXUBfqZU7uUe79iCqrNLZmKSQH91GW");
};
