require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
 

module.exports = {
  solidity: "0.8.8",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      chainId: 31337
    },
  },
};
