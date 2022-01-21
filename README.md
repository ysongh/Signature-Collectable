# Signature Collectable
A dapp where user can collect signatures and store them on IPFS

## Info

### Project name
Signature Collectable

### Working code in a public repo or PR to a public repo
https://github.com/ysongh/Signature-Collectable/tree/unstoppabledomains

### Recorded video demo of the integration (max. 3 mins)
https://youtu.be/YxHvN77lnvw

### Discord ID
You Song#4593

### UnstoppableDomain registered account email address
ysongweb3@gmail.com

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
- Unstoppable Domains Login

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
export const UNSTOPPABLEDOMAINS_CLIENTID = "< Your Unstoppable Domains Client Id >";
export const UNSTOPPABLEDOMAINS_CLIENTSECRET = "< Your Unstoppable Domains Client Secret >";
export const UNSTOPPABLEDOMAINS_REDIRECT_URI = "< Your Unstoppable Domains Redirect URL >";
export const UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI = "< Your Unstoppable Domains Logout Redirect URL >";
```
- Run `npm start` to start the dapp