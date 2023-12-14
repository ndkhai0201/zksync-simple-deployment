import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Provider, Wallet } from "zksync-web3";

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Base income stream contract`);

  const zkSyncProvider = new Provider(process.env.ZKSYNC_PROVIDER);
  const wallet = new Wallet(
    process.env.PRIVATE_KEY_WALLET as string,
    zkSyncProvider
  );
  console.log("Nonce: ", await wallet.getNonce());

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);

  const artifact = await deployer.loadArtifact("MyNFT");
  // Estimate contract deployment fee
  const deploymentFee = await deployer.estimateDeployFee(artifact, []);

  // OPTIONAL: Deposit funds to L2
  // Comment this block if you already have funds on zkSync.
  // const depositHandle = await deployer.zkWallet.deposit({
  //   to: deployer.zkWallet.address,
  //   token: utils.ETH_ADDRESS,
  //   amount: deploymentFee.mul(2),
  // });
  // Wait until the deposit is processed on zkSync
  // await depositHandle.wait();

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);
  const greeterContract = await deployer.deploy(artifact, []);

  //obtain the Constructor Arguments
  console.log("constructor args:" + greeterContract.interface.encodeDeploy([]));

  // Show the contract info.
  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
