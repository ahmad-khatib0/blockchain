const KryptoBird = artifacts.require("KryptoBird");
// this gonna grape the compiled contract
module.exports = function (deployer) {
  deployer.deploy(KryptoBird);
};
