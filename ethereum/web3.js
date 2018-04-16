import Web3 from 'web3';
/*Assume already Metamask is injected in web3 instance
onto the page : error occur !! */
//const web3 = new Web3(window.web3.currentProvider);
let web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
/*If We are in the browser && MetaMask already injected into web3(running)
Then hijack metamaks provider.  */
web3 = new Web3(window.web3.currentProvider);
}else {
//We are on the server *OR* the user is not running MetaMask
//set up own provider to connect rinkeby testnet through infura
const provider = new Web3.providers.HttpProvider(
  //open deploy.js
  'https://rinkeby.infura.io/UNZmpKWCgFk8DGvlnwKf'
);
web3 = new Web3(provider);
}

export default web3;
