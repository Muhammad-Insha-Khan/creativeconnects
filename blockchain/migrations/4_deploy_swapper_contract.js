const SkillSwapperContract = artifacts.require("SkillSwapperContract");

module.exports = function (deployer) {
    deployer.deploy(SkillSwapperContract, { gas: 5000000 }); // Increased gas limit
};
