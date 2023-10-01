import {React, useState, useEffect} from 'react'

function Wallet(){
    const [currentAccount, setCurrentAccount] = useState("0x");
    const [currentBalance, setCurrentBalance] = useState(0);
    const [currentHash, setCurrentHash] = useState(null);
    const wallet = window.ethereum;
    const RPC_URL = "http://127.0.0.1:6700"	

    useEffect(() => {
        connectToAccount();
    }, []);

    function connectToAccount() {
        if (wallet) {
            wallet
                .request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
		    const selectedAccount = accounts[0];
                    setCurrentAccount(selectedAccount);
                    getBalanceCurrentAccount(selectedAccount);
                })
                .catch((error) => {
                    throw new Error("Failed to retrieve Ethereum accounts:" + error);
                });
            wallet.on('accountsChanged', (accounts)=>{
                const selectedAccount = accounts[0];
                setCurrentAccount(selectedAccount);
		getBalanceCurrentAccount(selectedAccount);
            });
        } else {
            throw new Error("Ethereum provider not found. Please install MetaMask or a similar wallet.");
        }
    }

    function claimTokens(){
        const faucetURL = RPC_URL + "/faucet/" + currentAccount;
	fetch(faucetURL, {method: 'POST'})
	.then((response)=>{
		if(!response.ok){
		 throw new Error("Network response was not ok");	
		}
		return response.json();
	}).then((data)=>{
		const hash = data.hash;
		setCurrentHash("Hash: " +  hash);
	}).catch((err) => {
		throw new Error("Error: " + err);
	})
	
    }

    function getBalanceCurrentAccount(selectedAccount){
        const getBalanceURL = RPC_URL + "/getBalance/" + selectedAccount;
	fetch(getBalanceURL).then((response)=>{
                if(!response.ok){
                 throw new Error("Network response was not ok");
                }
                return response.json();
	}).then((data)=>{
		const currentBalance = data.balance;
		setCurrentBalance(currentBalance);
	}).catch((err)=>{
	   throw new Error("Error: " + err);	
	});
    }
    
    return (
        <div>
            <p>Account: <strong>{currentAccount}</strong></p>
            <p>Balance: <strong>{currentBalance}</strong></p>
            <button onClick={claimTokens}>Claim 0.1 tokens</button>
            <p><strong>{currentHash}</strong></p>
        </div>
    );
    
}

export default Wallet;
