require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    artifacts: '../reactjs/src/artifacts',
    cache: '../reactjs/src/cache',
  }
};
