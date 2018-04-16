import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),  //contract ABI
  '0x063A5c4fc76B01C47Bd6145641d01595706557aF' //addr deployed
);
export default instance;
