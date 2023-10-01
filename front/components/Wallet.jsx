import {React, useState, useEffect} from 'react'

function Wallet(){
    const [currentAccount, setCurrentAccount] = useState("0x");
    const wallet = window.ethereum;

    useEffect(() => {
        connectToAccount();
    }, []);

    function connectToAccount() {
        if (wallet) {
            wallet
                .request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    setCurrentAccount(accounts[0]);
                })
                .catch((error) => {
                    console.error('Failed to retrieve Ethereum accounts:', error);
                });
            wallet.on('accountsChanged', (accounts)=>{
                setCurrentAccount(accounts[0]);
            });
        } else {
            console.error('Ethereum provider not found. Please install MetaMask or a similar wallet.');
        }
    }

    function sendTokens(){
        console.log("Claiming 0.1 tokens")
    }
    
    return (
        <div>
            <p>Account: <strong>{currentAccount}</strong></p>
            <button onClick={sendTokens}>Claim 0.1 tokens</button>
        </div>
    );
    
}

export default Wallet;