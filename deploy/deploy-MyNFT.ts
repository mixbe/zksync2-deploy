// @ts-ignore
import dotenv from "dotenv";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Wallet} from "zksync-web3";
import {Deployer} from "@matterlabs/hardhat-zksync-deploy";
import * as ethers from "ethers";

dotenv.config();
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

if (!PRIVATE_KEY)
    throw "⛔️ Private key not detected! Add it to the .env file!";


export default async function (hre: HardhatRuntimeEnvironment) {
    console.log(`Running deploy script for the ERC721-MintSquare contract`);

    const wallet = new Wallet(PRIVATE_KEY);
    const deployer = new Deployer(hre, wallet);
    const artifact = await deployer.loadArtifact("MyNFT");

    const deploymentFee = await deployer.estimateDeployFee(artifact, []);

    const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
    console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

    const distributerContract = await deployer.deploy(artifact, []);
    console.log("constructor args:" + distributerContract.interface.encodeDeploy([]));

    const contractAddress = distributerContract.address;
    console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

}