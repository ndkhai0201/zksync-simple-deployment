import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Provider, Wallet } from "zksync-web3";

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script`);

  const zkSyncProvider = new Provider(process.env.ZKSYNC_PROVIDER);
  const wallet = new Wallet(
    process.env.PRIVATE_KEY_WALLET as string,
    zkSyncProvider
  );
  console.log("zkSyncProvider: ", process.env.ZKSYNC_PROVIDER);
  console.log("Wallet address: ", wallet.address);
  console.log("Nonce: ", await wallet.getNonce());
  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);

  const constructorArgs = []

  const artifact = await deployer.loadArtifact("MyToken");
  // Estimate contract deployment fee
  const deploymentFee = await deployer.estimateDeployFee(artifact, constructorArgs);

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);
  const myContract = await deployer.deploy(artifact, constructorArgs);

  //obtain the Constructor Arguments
  console.log("constructor args:" + myContract.interface.encodeDeploy(constructorArgs));

  // Show the contract info.
  const contractAddress = myContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
