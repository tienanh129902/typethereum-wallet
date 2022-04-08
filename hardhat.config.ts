import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-ethers";
// import { Contracts } from "./src/entity/Contract";


dotenv.config();

//Hardhat tasks for my API
task("accounts", "Prints the list of accounts", async (_taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// @ts-ignore
task("faucet", "Sends ETH and tokens to an address")
  .addPositionalParam("receiver", "The address that will receive them")
  .addPositionalParam("amount", "Number of tokens to be transfers")
  .setAction(async ({ receiver, amount }, { ethers }) => {
    // if (network.name === "hardhat") {
    //   console.warn(
    //     "You are running the faucet task with Hardhat network, which" +
    //     "gets automatically created and destroyed every time. Use the Hardhat" +
    //     " option '--network localhost'"
    //   );
    // }
    // const contract = Contracts.findOne({ name: "MyToken" });
    // if (!contract) {
    //   console.error("You need to deploy your contract first");
    //   return;
    // } else {
      // @ts-ignore
      const token = await ethers.getContractAt("myToken", "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9");
      const [sender] = await ethers.getSigners();

      const tx = await token.transfer(receiver, amount);
      await tx.wait();

      const tx2 = await sender.sendTransaction({
        to: receiver,
        value: ethers.constants.WeiPerEther
        // value: 1000000000000000000 * amount
      });
      await tx2.wait();
      console.log(`Transferred 1 ETH and ${amount} tokens to ${receiver}`);
    // }
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.10",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    localhost: {
      url: "http://127.0.0.1:8545/"
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
