import { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";


// dynamically changes endpoints for local tests
// const zkSyncTestnet =
//   process.env.NODE_ENV == "test"
//     ? {
//         url: "http://localhost:3050",
//         ethNetwork: "http://localhost:8545",
//         zksync: true,
//       }
//     : {
//         url: "https://zksync2-testnet.zksync.dev",
//         ethNetwork: "goerli",
//         zksync: true,
//       };

const config: HardhatUserConfig = {
  zksolc: {
    version: "1.3.10",
    compilerSource: "binary",
    settings: {},
  },
  // defaultNetwork: "zkSyncTestnet",
  defaultNetwork: "zkTestnet",
  networks: {
    hardhat: {
      zksync: false,
    },
    goerli: {
      url: "https://goerli.infura.io/v3/<API_KEY>" // The Ethereum Web3 RPC URL (optional).
    },
    zkTestnet: {
      url: "https://testnet.era.zksync.dev", // The testnet RPC URL of zkSync Era network.
      ethNetwork: "goerli", // The Ethereum Web3 RPC URL, or the identifier of the network (e.g. `mainnet` or `goerli`)
      zksync: true,
      // Verification endpoint for Goerli
      verifyURL: 'https://zksync2-testnet-explorer.zksync.dev/contract_verification'
    },
    // zkSyncTestnet,
  },
  solidity: {
    version: "0.8.17",
  },
};

export default config;
