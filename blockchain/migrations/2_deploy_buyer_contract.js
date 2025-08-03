const BuyerContract = artifacts.require("BuyerContract");

module.exports = function (deployer) {
    deployer.deploy(BuyerContract, { gas: 5000000 }); // Increased gas limit
};
