import {HardhatRuntimeEnvironment} from "hardhat/types";
import * as ethers from "ethers";
import {Wallet} from "zksync-web3";
import {Deployer} from "@matterlabs/hardhat-zksync-deploy";

// @ts-ignore
import dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

if (!PRIVATE_KEY)
    throw "⛔️ Private key not detected! Add it to the .env file!";


export default async function (hre: HardhatRuntimeEnvironment) {
    console.log("Runing deploy script for the Token contract");

    const wallet = new Wallet(PRIVATE_KEY);
    const deployer = new Deployer(hre, wallet);
    const artifact = await deployer.loadArtifact("MyToken");

    const constructorArguments = ["USD Coin", "USDC"]
    const deploymentFee = await deployer.estimateDeployFee(artifact,constructorArguments)

    const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
    console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

    const myTokenContract = await deployer.deploy(artifact, constructorArguments);
    console.log("constructor args:" + myTokenContract.interface.encodeDeploy(constructorArguments));

    // Show the contract info.
    const contractAddress = myTokenContract.address;
    console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

    //  yarn hardhat verify --network zkTestnet xxxxx "USD Coin" "USDC"

}