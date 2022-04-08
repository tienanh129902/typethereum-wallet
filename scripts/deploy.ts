// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // When running the script with `npx hardhat run <script>` you'll find the Hardhat
// // Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
// import { Token } from "../src/entity/Token";
// import mongoose from "mongoose";

async function userDeploy() {
  // if (network.name === "hardhat") {
  //   console.warn(
  //     "You are trying to deploy a contract to the Hardhat Network, which" +
  //     "gets automatically created and destroyed every time. Use the Hardhat" +
  //     " option '--network localhost'"
  //   );
  // }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:", await deployer.getAddress());

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const myToken = await ethers.getContractFactory("myToken");
  const token = await myToken.deploy();
  await token.deployed();

  console.log("Token address:", token.address);

  //@ts-ignore
  // await mongoose.connect(`mongodb://localhost:27017`,{ useNewUrlParser: true, useUnifiedTopology: true })
  //   .catch(err => console.log('err: ',err));
  // try {
  //   await Token.create({
  //     address: token.address,
  //     accountID: deployer.getAddress().toString()
  //   });
  //   console.log("Token successfully create");
  //   return true;
  // } catch (err) {
  //   console.log(err);
  //   throw new Error("Can't create token");
  // }
}

userDeploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
