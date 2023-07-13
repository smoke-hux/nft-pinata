require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const MUMBAI_NETWORK = process.env.MUMBAI_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url: MUMBAI_NETWORK,
      accounts: [PRIVATE_KEY],
    },
  },
};
