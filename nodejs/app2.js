// in node.js
var Web3 = require('web3');
var rpc = require('node-json-rpc');
const request = require('request');
var fs = require('fs')
var HDWalletProvider = require('truffle-hdwallet-provider'); 
var ABI = require('./ABI.js')

var mnemonic = "mountains supernatural bird..."; // 12 word mnemonic
var provider = new HDWalletProvider(mnemonic, "http://localhost:8546");

var web3_ws = new Web3('ws://localhost:8545');
web3_ws.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
var web3_rpc = new Web3('http://localhost:8546');

var web3_truffle = new Web3(provider);

const deploy = async () => {
    accounts = await web3_truffle.eth.getAccounts(); 
    console.log(accounts[0])
    console.log('attempting to deploy from account',accounts[0]);

    const result = await new web3_truffle.eth.Contract((ABI.ABI)) 
      .deploy({data:ABI.byte_code, arguments:[accounts[0], 'My String2','My String2',18118]})     
      .send({from: accounts[0], gas:'1000000'});                              

    console.log('Contract deployed to', result.options.address); 
};


//deploy();
//web3_ws.eth.getAccounts(console.log)
//web3_truffle.eth.getAccounts(console.log)




// let options = {
//     url: "http://localhost:8546",
//     method: "post",
//     headers:
//     { 
//      "content-type": "application/json"
//     },
//     body: JSON.stringify({
//         "jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1
//     })
// };

// request(options, (error, response, body) => {
//     if (error) {
//         console.error('An error has occurred: ', error);
//     } else {
//         console.log('Post successful: response: ', body);
//     }
// });


web3_ws.eth.getCoinbase().then(function(coinbase){    
    web3_rpc.eth.personal.unlockAccount(coinbase, "1", 600).then(console.log('Account unlocked!'))
});

//let myContract = new web3_ws.eth.Contract(ABI.ABI, {from: '0xdd4c3bd95e204ebe5d086f38f4ecadeac7379dbc',  data: ABI.byte_code});
// let myContract = new web3_ws.eth.Contract(ABI.ABI);

// myContract.deploy({
//     arguments: ['0xdd4c3bd95e204ebe5d086f38f4ecadeac7379dbc', 'My String2','My String2',18118]
// })
// .send({
//     from: '0xdd4c3bd95e204ebe5d086f38f4ecadeac7379dbc',
//     gasLimit: '4700000'
// }, function(error, transactionHash){ 
//     console.log('transactionHash');
//     console.log(transactionHash);
//  })
// .on('error', function(error){ 
//     console.log('error');
//     console.log(error);
//  })
// .on('transactionHash', function(transactionHash){ 
//     console.log('transactionHash2');
//     console.log(transactionHash);
//  })
// .on('receipt', function(receipt){
//     console.log('receipt');
//    console.log(receipt.contractAddress) // contains the new contract address
// })
// .on('confirmation', function(confirmationNumber, receipt){ 
//     console.log('confirmation');
//     console.log(confirmationNumber);
//     console.log(receipt);
//  })
// .then(function(newContractInstance){
//     console.log(newContractInstance);
//     console.log(newContractInstance.options.address) // instance with the new contract address
// });


//var myContract = new web3_ws.eth.Contract([{"constant":false,"inputs":[{"name":"status","type":"uint8"}],"name":"updateStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLatitudeLongitude","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getStatus","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"setValue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"components":[{"name":"_seller","type":"address"},{"name":"_buyer","type":"address"},{"name":"_latitudeLongitude","type":"string"},{"name":"_locationAddress","type":"string"},{"name":"_value","type":"uint256"},{"name":"_status","type":"uint8"}],"name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSellerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLocationAddress","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBuyerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"seller","type":"address"},{"name":"latitudeLongitude","type":"string"},{"name":"locationAddress","type":"string"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);

//console.log(myContract);

// When the data is already set as an option to the contract itself

// myContract.options.data = '0xdd4c3bd95e204ebe5d086f38f4ecadeac7379dbc';

// myContract.deploy({
//     data: '0x60806040523480156200001157600080fd5b506040516200122d3803806200122d833981810160405262000037919081019062000397565b83600160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260016002019080519060200190620000969291906200025e565b508160016003019080519060200190620000b29291906200025e565b50806001600401819055506000600160050160006101000a81548160ff02191690836002811115620000e057fe5b0217905550426000620000fa60006200012560201b60201c565b6040516200010991906200046c565b908152602001604051809103902081905550505050506200059e565b60608160028111156200013457fe5b600060028111156200014257fe5b141562000187576040518060400160405280600781526020017f74726164696e6700000000000000000000000000000000000000000000000000815250905062000259565b8160028111156200019457fe5b60016002811115620001a257fe5b1415620001e7576040518060400160405280600881526020017f636f6d706c657465000000000000000000000000000000000000000000000000815250905062000259565b816002811115620001f457fe5b6002808111156200020157fe5b141562000246576040518060400160405280600a81526020017f7465726d696e6174656400000000000000000000000000000000000000000000815250905062000259565b6040518060200160405280600081525090505b919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002a157805160ff1916838001178555620002d2565b82800160010185558215620002d2579182015b82811115620002d1578251825591602001919060010190620002b4565b5b509050620002e19190620002e5565b5090565b6200030a91905b8082111562000306576000816000905550600101620002ec565b5090565b90565b6000815190506200031e816200056a565b92915050565b600082601f8301126200033657600080fd5b81516200034d6200034782620004b3565b62000485565b915080825260208301602083018583830111156200036a57600080fd5b6200037783828462000534565b50505092915050565b600081519050620003918162000584565b92915050565b60008060008060808587031215620003ae57600080fd5b6000620003be878288016200030d565b945050602085015167ffffffffffffffff811115620003dc57600080fd5b620003ea8782880162000324565b935050604085015167ffffffffffffffff8111156200040857600080fd5b620004168782880162000324565b9250506060620004298782880162000380565b91505092959194509250565b60006200044282620004e0565b6200044e8185620004eb565b93506200046081856020860162000534565b80840191505092915050565b60006200047a828462000435565b915081905092915050565b6000604051905081810181811067ffffffffffffffff82111715620004a957600080fd5b8060405250919050565b600067ffffffffffffffff821115620004cb57600080fd5b601f19601f8301169050602081019050919050565b600081519050919050565b600081905092915050565b600062000503826200050a565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b838110156200055457808201518184015260208101905062000537565b8381111562000564576000848401525b50505050565b6200057581620004f6565b81146200058157600080fd5b50565b6200058f816200052a565b81146200059b57600080fd5b50565b610c7f80620005ae6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80635524107711610066578063552410771461010e5780635a9b0b891461012a57806384b09e8614610148578063c45bf3cc14610166578063fa0c15131461018457610093565b80630b3af7f91461009857806320965255146100b457806343590a34146100d25780634e69d560146100f0575b600080fd5b6100b260048036036100ad9190810190610927565b6101a2565b005b6100bc610276565b6040516100c99190610afc565b60405180910390f35b6100da610283565b6040516100e79190610ab8565b60405180910390f35b6100f8610328565b6040516101059190610ab8565b60405180910390f35b610128600480360361012391908101906108fe565b610489565b005b610132610528565b60405161013f9190610ada565b60405180910390f35b610150610769565b60405161015d9190610a9d565b60405180910390f35b61016e610796565b60405161017b9190610ab8565b60405180910390f35b61018c61083b565b6040516101999190610a9d565b60405180910390f35b600160028111156101af57fe5b600160050160009054906101000a900460ff1660028111156101cd57fe5b14156101d857600080fd5b60008160ff16141561020c576000600160050160006101000a81548160ff0219169083600281111561020657fe5b02179055505b60018160ff16141561023f5760018060050160006101000a81548160ff0219169083600281111561023957fe5b02179055505b60028160ff161415610273576002600160050160006101000a81548160ff0219169083600281111561026d57fe5b02179055505b50565b6000600160040154905090565b606060016002018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561031e5780601f106102f35761010080835404028352916020019161031e565b820191906000526020600020905b81548152906001019060200180831161030157829003601f168201915b5050505050905090565b6060600160050160009054906101000a900460ff16600281111561034857fe5b6000600281111561035557fe5b1415610398576040518060400160405280600781526020017f74726164696e67000000000000000000000000000000000000000000000000008152509050610486565b600160050160009054906101000a900460ff1660028111156103b657fe5b600160028111156103c357fe5b1415610406576040518060400160405280600881526020017f636f6d706c6574650000000000000000000000000000000000000000000000008152509050610486565b600160050160009054906101000a900460ff16600281111561042457fe5b60028081111561043057fe5b1415610473576040518060400160405280600a81526020017f7465726d696e61746564000000000000000000000000000000000000000000008152509050610486565b6040518060200160405280600081525090505b90565b6001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104e557600080fd5b600160028111156104f257fe5b600160050160009054906101000a900460ff16600281111561051057fe5b141561051b57600080fd5b8060016004018190555050565b610530610867565b60016040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106825780601f1061065757610100808354040283529160200191610682565b820191906000526020600020905b81548152906001019060200180831161066557829003601f168201915b50505050508152602001600382018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107245780601f106106f957610100808354040283529160200191610724565b820191906000526020600020905b81548152906001019060200180831161070757829003601f168201915b50505050508152602001600482015481526020016005820160009054906101000a900460ff16600281111561075557fe5b600281111561076057fe5b81525050905090565b6000600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060016003018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108315780601f1061080657610100808354040283529160200191610831565b820191906000526020600020905b81548152906001019060200180831161081457829003601f168201915b5050505050905090565b60006001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6040518060c00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001606081526020016060815260200160008152602001600060028111156108ce57fe5b81525090565b6000813590506108e381610c0e565b92915050565b6000813590506108f881610c25565b92915050565b60006020828403121561091057600080fd5b600061091e848285016108d4565b91505092915050565b60006020828403121561093957600080fd5b6000610947848285016108e9565b91505092915050565b61095981610b4f565b82525050565b61096881610b4f565b82525050565b61097781610bab565b82525050565b600061098882610b22565b6109928185610b3e565b93506109a2818560208601610bbd565b6109ab81610bf0565b840191505092915050565b60006109c182610b17565b6109cb8185610b2d565b93506109db818560208601610bbd565b6109e481610bf0565b840191505092915050565b600060c083016000830151610a076000860182610950565b506020830151610a1a6020860182610950565b5060408301518482036040860152610a3282826109b6565b91505060608301518482036060860152610a4c82826109b6565b9150506080830151610a616080860182610a7f565b5060a0830151610a7460a086018261096e565b508091505092915050565b610a8881610b94565b82525050565b610a9781610b94565b82525050565b6000602082019050610ab2600083018461095f565b92915050565b60006020820190508181036000830152610ad2818461097d565b905092915050565b60006020820190508181036000830152610af481846109ef565b905092915050565b6000602082019050610b116000830184610a8e565b92915050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b6000610b5a82610b74565b9050919050565b6000819050610b6f82610c01565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b6000610bb682610b61565b9050919050565b60005b83811015610bdb578082015181840152602081019050610bc0565b83811115610bea576000848401525b50505050565b6000601f19601f8301169050919050565b60038110610c0b57fe5b50565b610c1781610b94565b8114610c2257600080fd5b50565b610c2e81610b9e565b8114610c3957600080fd5b5056fea365627a7a723158201311955b55883d5cdc8c4ccc21ad798f615d28f522e1c947975d01b51aa578d76c6578706572696d656e74616cf564736f6c634300050c0040',
//     arguments: ['0xdd4c3bd95e204ebe5d086f38f4ecadeac7379dbc', 'My String2','My String2',2132221]
// })
// .send({
//     from: '0xdd4c3bd95e204ebe5d086f38f4ecadeac7379dbc',
//     gasLimit: '3000000'
// })
// .then(function(newContractInstance){
//     console.log("gregergerger"+newContractInstance.options.address) // instance with the new contract address
// });


// web3_ws.eth.getBlockNumber(function(err,rtn){
//     if(err) return console.log(err);
//     var latest_block_number = rtn;
//     for(var i=0; i <= latest_block_number; i++){
//         web3_ws.eth.getBlock(i, false, function(err, block) {
//             //console.log(block);
//         });
//     }
// });


/*
var contract = new web3_ws.eth.Contract(ABI.ABI, '0x84c6b3495de306dfa3c048b331208ff73811655bcf23011976475a91cebe46bc',{
    gasPrice: '3000000' // default gas price in wei, 20 gwei in this case
})
console.log(contract);
*/


var contract = new web3_ws.eth.Contract(ABI.ABI,'0x52d5d750eb85fa50973f7319b03b85f27169dbc1');
var status;
contract.methods.getInfo().call().then((result) =>{
    //status = result;
    console.log(result)
})




var subscription1 = web3_ws.eth.subscribe('pendingTransactions', function(error, result){
    if (!error)
        console.log(result);
})
.on("data", function(transaction){
    console.log(transaction);
});

// unsubscribes the subscription
subscription1.unsubscribe(function(error, success){
    if(success)
        console.log('Successfully unsubscribed!');
});

var subscription2 = web3_ws.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
        console.log(result);

        return;
    }

    console.error(error);
})
.on("data", function(blockHeader){
    console.log(blockHeader);
})
.on("error", console.error);

// unsubscribes the subscription
subscription2.unsubscribe(function(error, success){
    if (success) {
        console.log('Successfully unsubscribed!');
    }
});

var subscription3 = web3_ws.eth.subscribe('syncing', function(error, sync){
    if (!error)
        console.log(sync);
})
.on("data", function(sync){
    // show some syncing stats
})
.on("changed", function(isSyncing){
    if(isSyncing) {
        // stop app operation
    } else {
        // regain app operation
    }
});

// unsubscribes the subscription
subscription3.unsubscribe(function(error, success){
    if(success)
        console.log('Successfully unsubscribed!');
});

web3_ws.eth.getBlockNumber(function(err, rtn) {
    var latest_block_number = rtn;
    for(var i=0; i < latest_block_number; i++){
        (function(i){
            web3_ws.eth.getBlockTransactionCount(i, true, function(err, cnt) {
                if(cnt > 0){
                    for(var j=0; j < cnt; j++){
                        web3_ws.eth.getTransactionFromBlock(i,j,function(err,tx){
                            //console.log(tx.hash);
                        }); 
                    }
                }
            });
        })(i);
    }
});



