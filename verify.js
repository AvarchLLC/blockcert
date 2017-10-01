var eth = require('./lib/ethereum.js');
//var txHash = "0x4f31e2769c1f500b244cd67a47b6c95da98c75cddd78559066185e70cdd0851c"//force conversion
var opn = require('opn');
var inquirer = require('inquirer');





inquirer.prompt([{
  name: 'txHash',
  type: 'input',
  message: 'Enter private key of issuier wallet==> ',
}]).then((answers) => {
  

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}



eth.getPayload(answers.txHash).then(function(result){


opn('https://ipfs.io/ipfs'+"/"+hex2a(result).substring(3), {app: 'firefox'});


})

});