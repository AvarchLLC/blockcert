var request = require('request');
var Promise = require("bluebird");
 const EthereumTx = require('ethereumjs-tx')

var exports = module.exports = {};

exports.getNonce=function(address) {


return new Promise(function(resolve, reject) {
  
 var data1={"jsonrpc":"2.0","method":"eth_getTransactionCount","params":[address,"latest"],"id":42}


var op={
  url:'https://kovan.infura.io',
  headers: {
    'Content-Type': 'application/json'
  },
   json: data1
}

request.post(op, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }


      resolve(body.result); 
  


})

})

}


exports.blockifyCertificate=function(fromAdressPrivatekey,txParams) {
return new Promise(function(resolve, reject) {

	
 const privateKey  = new Buffer(fromAdressPrivatekey,'hex')
 
  const tx = new EthereumTx(txParams)
  tx.sign(privateKey)
  const serializedTx = tx.serialize()
  var data= {"jsonrpc": "2.0", "id": 42, "method":"eth_sendRawTransaction", "params": ["0x"+serializedTx.toString('hex')]}


   var options={
         url:'https://kovan.infura.io',
         headers: {
            'Content-Type': 'application/json'
            },
          json: data
        }
   request.post(options, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
    
   resolve(body.result); 
  

       })

})
}

exports.getPayload=function(txhash) {


return new Promise(function(resolve, reject) {
var data2={"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":[txhash],"id":42}


var op2={
  url:'https://kovan.infura.io/5P1FeD7NtBq3PGkDSVjG',
  headers: {
    'Content-Type': 'application/json'
  },
   json: data2
}

request.post(op2, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }

    resolve(body.result.input); 
  console.log('Upload successful!  Server responded with:', body);


})

})

}



