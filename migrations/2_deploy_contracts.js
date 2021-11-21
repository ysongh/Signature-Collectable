const SignatureCollectable = artifacts.require("SignatureCollectable");

module.exports = function(deployer){
  deployer.deploy(SignatureCollectable);
}