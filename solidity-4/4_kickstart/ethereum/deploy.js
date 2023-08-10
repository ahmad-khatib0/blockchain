const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "pair pride dutch diagram spike gadget menu twenty welcome mail asthma fossil",
  // remember to change this to your own phrase!
  "https://rinkeby.infura.io/v3/13acdaf1e27647d9925f72b82f0d6bf6"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });
  console.log("Contract deployed to", result.options.address);
};
deploy();
