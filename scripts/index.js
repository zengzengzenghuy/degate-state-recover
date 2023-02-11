const { ethers } = require("ethers");
require("dotenv").config();

//const proof = require("./MerkleProof.json")
const RPC = "https://rpc.ankr.com/eth_rinkeby";

const provider = new ethers.providers.JsonRpcProvider(RPC);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const exchangeAbi = require("./ExchangeV3.abi.json");
const exchangeAddress = "";

async function main() {
  console.log("Initiating tx... ");
  const dgContract = new ethers.Contract(exchangeAddress, exchangeAbi, wallet);

  owner = await dgContract.owner();
  console.log(`dgContract owner = ${owner}`);

  balance = await wallet.getBalance();
  console.log(
    `${wallet.address} balance: ${ethers.utils.formatEther(balance)}`
  );

  const estimateGas = await dgContract.estimateGas.withdrawFromMerkleTree(
    proof
  );
  console.log(`estimate Gas ${estimateGas.toString()}`);

  const tx = await dgContract.withdrawFromMerkleTree(proof);
  await tx.wait();
  console.log(tx);
}
main();
