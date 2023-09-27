const Web3 = require("web3")
const web3 = new Web3("http://127.0.0.1:8545")

const getBalance = async()=>{
    return await web3.eth.getBalance("0x004385d8be6140e6f889833f68b51e17b6eacb29")
}

console.log("Balance: ", getBalance())