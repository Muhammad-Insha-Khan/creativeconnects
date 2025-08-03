const SellerContract = artifacts.require("SellerContract");

module.exports = function (deployer) {
    deployer.deploy(SellerContract, { gas: 5000000 }); // Increased gas limit
};
