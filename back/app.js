const {Web3} = require("web3")
const web3 = new Web3("http://127.0.0.1:8545")
const ACCOUNT = "0x00da8e0e602417bb446433cfd8ad1e7f45a6a97e"
const express = require("express")
const app = express()
const PORT = 6700

app.listen(PORT,()=>{
    console.log("Listening in port: ", PORT)
})

app.get("/balance", async(req, res)=>{
    getBalance()
})

const getBalance = async(account) => {
	const balance = await web3.eth.getBalance(account)
	console.log("ETHER: ", web3.utils.fromWei(balance, "ether"))
}
