const {Web3} = require("web3");
const web3 = new Web3("http://127.0.0.1:8545");
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 6700;
const KEY_FILE = "../custom_blockchain/data/keystore/UTC--2023-09-30T10-45-43.872863079Z--b854a30b9651a9d50a847b9c2cf43e975719cd22";

const json = JSON.parse(fs.readFileSync(KEY_FILE));

app.listen(PORT,()=>{
    console.log("Listening in port: ", PORT);
});

app.post("/faucet/:address", async (req, res) => {
  try {
    const accountToSend = req.params.address;
    const accountFrom = await web3.eth.accounts.decrypt(json, "node01");
    const chainId = 9000;
    const gasPriceInWei = web3.utils.toWei("50", "gwei");
    const gasLimit = 60000;
    const valueInWei = web3.utils.toWei("0.1", "ether");
    const nonce = String(parseInt(await getCurrentNonce(accountFrom.address)) + 1);

    const tx = {
      chainId: chainId,
      from: accountFrom.address,
      to: accountToSend,
      gas: gasLimit,
      gasPrice: gasPriceInWei,
      value: valueInWei,
      nonce: nonce
    };

    const signedTx = await accountFrom.signTransaction(tx);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
  .on('transactionHash', (hash) => {
    console.log(`Transaction hash: ${hash}`);
  })
  .on('receipt', (receipt) => {
    console.log(`Transaction receipt:`, receipt);
    res.status(200).send({hash: receipt.transactionHash});
  })
  .on('error', (error) => {
    console.error('Error sending transaction:', error);
    res.status(500).send({ error: 'Transaction failed' });
  });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send({ error: 'Transaction failed' });
  }
});



app.get("/getBalance/:address", async(req, res)=>{
   try{
    const account = req.params.address;
    const balance = await web3.eth.getBalance(account);
    res.send({balance: web3.utils.fromWei(balance, "ether")});
  } catch(err){
    res.status(500).send({error: 'Get Balance failed'});
  }
});

const getCurrentNonce = async (senderAddress) => {
  return await web3.eth.getTransactionCount(senderAddress, 'latest', (error, nonce) => {
      if (!error) {
        console.log('Current Nonce:', nonce);
        return nonce.toString();
      } else {
        console.error('Error:', error);
        return error.toString();
      }
    });
};
