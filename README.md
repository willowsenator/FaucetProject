# FAUCET PROJECT

## BLOCKCHAIN CONFIGURATION

***Create an account***

> docker run --rm -it -v ${pwd}/data/keystore:/data ethereum/client-go:v1.11.5 account new --keystore data

* This will create a new account with public key and private key.
* We have to add the public key to our genesis.json file.

***genesis.json***

> {
> "config": {
> "chainId": 9000,
> "homesteadBlock": 0,
> "eip150Block": 0,
> "eip155Block": 0,
> "eip158Block": 0,
> "byzantiumBlock": 0,
> "constantinopleBlock": 0,
> "petersburgBlock": 0,
> "ethash": {}
> },
> "difficulty": "1",
> "gasLimit": "12000000",
> "alloc": {
> "0xB854A30B9651a9D50a847b9c2Cf43e975719Cd22": {
> "balance": "1000000000000000000000000000"
> }
> }
> }

***Init the genesis node***

> docker run --rm -it -v $(pwd)/data:/data -v $(pwd)/genesis.json:/genesis.json ethereum/client-go:v1.11.5 init --datadir data /genesis.json

***Start the node***

> docker run -d --name eth\_node\_01 -p 8545:8545 -p 33003:33003 -v $(pwd)/data:/data ethereum/client-go:v1.11.5 --datadir data --http --http.api "personal,eth,net,web3,rpc" --http.addr 0.0.0.0 --http.port 8545 --http.corsdomain="\*" --mine --miner.etherbase 0xB854A30B9651a9D50a847b9c2Cf43e975719Cd22 --miner.threads 1
