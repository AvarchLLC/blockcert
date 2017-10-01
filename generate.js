var inquirer = require('inquirer');
var createPdf = require('./lib/createPDF.js');
var eth = require('./lib/ethereum.js');
var ipfs=require('./lib/ipfs.js')
var fs = require('fs');
var util = require('ethereumjs-util');// /v
inquirer.prompt([{
  name: 'privatekey',
  type: 'input',
  message: 'Enter private key of issuier wallet==> ',
}]).then((answers) => {
  
var ipfsHash;




var privateKey=answers.privatekey.substring(2);

var address="0x"+util.privateToAddress(answers.privatekey).toString('hex');
createPdf().then(function(result){
	

  return ipfs.addCertificate(result);

}).then(function(result){
   
    ipfsHash=result;

    return eth.getNonce(address)

}).then(function(result){

  
  const txParams = {
  nonce:result,	
  gasPrice: '0x4a817c800', 
  gasLimit: '0x125000',
  to: '0x5B019c67A26A9e66ac2Bbb7369Cef66Ba40140dD', 
  value: '0x00', 
  data: ipfsHash,
  // EIP 155 chainId - mainnet: 1, ropsten: 3
  chainId: 42
}

return eth.blockifyCertificate(privateKey,txParams)

}).then(function(result){

console.log("Transaction hash, you need this to verify the certificate on blockchain::::"+result)
return createPdf(result)

}).then(function(result){
fs.writeFile('./certificate/certificate'+new Date().toUTCString()+'.pdf',result, function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log("Certicate generated in Certicate folder");


})})
});