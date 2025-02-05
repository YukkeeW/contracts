import { task, types } from "hardhat/config";
import { Contract } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";

import { env } from "../lib/env";
import { getWallet } from "../lib/wallet";

task("deploy-contract", "Deploy main Rebels contract")
  .addParam("contractType", "Type of contract to deploy", undefined, types.string)
  .addParam("name", "Collection name", undefined, types.string)
  .addParam("symbol", "Collection symbol", undefined, types.string)
  .addParam("maxSupply", "Maximum collection size", undefined, types.int)
  .setAction(async (taskArgs, hre) => {
    return hre.ethers
      .getContractFactory(taskArgs.contractType, getWallet())
      .then((contractFactory) => contractFactory.deploy(
        taskArgs.name, taskArgs.symbol, taskArgs.maxSupply))
      .then((result) => {
        console.log(`Contract address: ${result.address}`);
      });
  });

task("deploy-baseuri-renderer", "Deploy basic baseURI-style renderer")
  .addParam("baseUri", "Base URI of token metadata", undefined, types.string)
  .setAction(async (taskArgs, hre) => {
    return hre.ethers
      .getContractFactory("BaseURIRenderer", getWallet())
      .then((contractFactory) => contractFactory.deploy(taskArgs.baseUri))
      .then((result) => {
        console.log(`Contract address: ${result.address}`);
      });
  });
