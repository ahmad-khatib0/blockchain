import Web3 from "web3";

// window.ethereum.request({ method: "eth_requestAccounts" });
// const web3 = new Web3(window.ethereum);

let web3;
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    //so this is how we make our own provider
    "https://rinkeby.infura.io/v3/13acdaf1e27647d9925f72b82f0d6bf6"
  );
  web3 = new Web3(provider);
}

export default web3;
