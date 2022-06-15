import web3 from "./web3";
import campaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  "0xf5aDcE3B0D0B68605F50d8a5Ca4863aC58dA3C73"
);

export default instance;
