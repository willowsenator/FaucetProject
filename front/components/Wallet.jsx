import {React, useState, useEffect} from 'react'

function Wallet(){
    const [currentAccount, setCurrentAccount] = useState("0x");
    const [currentBalance, setCurrentBalance] = useState(0);
    const wallet = window.ethereum;
    const RPC_URL = "http://127.0.0.1:8545"	

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
                    console.error('Failed to retrieve Ethereum accounts:', error);
                });
            wallet.on('accountsChanged', (accounts)=>{
                const selectedAccount = accounts[0];
                setCurrentAccount(selectedAccount);
		getBalanceCurrentAccount(selectedAccount);
            });
        } else {
            console.error('Ethereum provider not found. Please install MetaMask or a similar wallet.');
        }
    }

    function sendTokens(){
        console.log("Claiming 0.1 tokens");
	
    }

    function getBalanceCurrentAccount(){
        const getBalanceURL = RPC_URL + "/getBalance/" + currentAccount;
	fetch(getBalanceURL).then((result)=>{
		setCurrentBalance(result.balance);
	}).catch((err)=>{
	   console.error("Error: ", err);	
	})
    }
    
    return (
        <div>
            <p>Account: <strong>{currentAccount}</strong></p>
            <p>Balance: <strong>{currentBalance}</strong></p>
            <button onClick={sendTokens}>Claim 0.1 tokens</button>
        </div>
    );
    
}

export default Wallet;
