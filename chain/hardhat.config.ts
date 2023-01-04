import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545/'
    }
  }
};

export default config;
