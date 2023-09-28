const {Web3} = require("web3")
const web3 = new Web3("http://127.0.0.1:8545")
const express = require("express")
const fs = require("fs")
const Tx = require("ethereumjs-tx").Transaction

const app = express()
const PORT = 6700
const KEY_FILE = "../custom_blockchain/rpc/keys/chain_authority/UTC--2023-08-29T20-43-20Z--73be6d88-5af0-9b79-ba85-b4bc69253fed"

const json = JSON.parse(fs.readFileSync(KEY_FILE))

app.listen(PORT,()=>{
    console.log("Listening in port: ", PORT)
})

app.post("/faucet/:address", async(req, res) => {
   try {
     const accountToSend = web.utils.toHex(req.params.address)
     const accountFrom = web3.eth.accounts.decrypt(json, "user0")

     const rawTx = {
	chainId: 8995,
        from: accountFrom.address,
        to: accountToSend,
        gas: 30000,
        value: web3.utils.toWei("0.1", "ether")
     }

     var tx = new Tx(rawTx)
     tx.sign(rawTx)
     var serializedTx = tx.serialize()

     console.log("Serialized Tx: ", serializedTx)
     const response = await web3.eth.sendSignedTransaction(serializedTx)
     res.json({ transactionHash: response.transactionHash });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Transaction failed' });
    }
})

app.get("/getBalance/:address", async(req, res)=>{
   try{
    const account = req.params.address
    const balance = await web3.eth.getBalance(account)
    res.send(web3.utils.fromWei(balance, "ether"))
  } catch(err){
    res.send(err)
  }
})
