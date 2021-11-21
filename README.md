# Signature Collectable
A dapp where user can collect signatures and store them on IPFS

## Features
- Users can create their signature and stored them on IPFS
- Users can share their collection of signatures with other to sign
- Users can mint them as NFT for free on Polygon network 

## Technologies
- React
- Bootraps 5
- Truffle
- Web3
- Slate API
- Covalent API
- NFTPort API
- ENS

## Running the dapp on local host
- Clone or download this repository
- Run `npm i` to install the dependencies
- Install and open up Ganache and click "Quickstart"
- Run `truffle migrate` to deploy the contract
- Create a file called 'config.js' on the src folder and add the following code
```
export const SLATEAPIKEY = "< Create API key from slate.host >";
export const NFTPORT_APIKEY= "< Your NFT PORT API key >";
export const COVALENT_APIKEY= "< Your Covalent API key >";
```
- Run `npm start` to start the dapp