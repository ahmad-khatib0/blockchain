const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_STRING = "Hi There ";
beforeEach(async () => {
  // Get list of all the accounts
  accounts = await web3.eth.getAccounts(); //Almost all funcs in web3 are async

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("Deployes a contract ", () => {
    assert.ok(inbox.options.address);
    //if it has an address, so it deployed. ok = is it a defined value?
  });
  it("has a default ", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });
  it("can change the message ", async () => {
    await inbox.methods.setMessage("Bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "Bye");
  });
});
