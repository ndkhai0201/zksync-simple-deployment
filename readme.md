# ZKSYNC SIMPLE DEPLOYMENT
## Enviroment : 
- Node: v16

## Setup : 
- Install node_modules: `yarn`
## Compile contract: 
Cmd: `yarn hardhat compile`

## Deploy :
 - Update `ZKSYNC_PROVIDER` and `PRIVATE_KEY_WALLET` in `.env`
### 1. Nft: 
Cmd: `yarn hardhat deploy-zksync --script 01_deploy_token.ts `
## Verify:
### 1. Nft:  
Cmd: `yarn hardhat verify --network zkSyncTestnet [contract address]`
