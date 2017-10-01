var request = require('request');
var Promise = require("bluebird");


var exports = module.exports = {};

exports.addCertificate=function(certData) {


return new Promise(function(resolve, reject) {

  var formData = {
my_file:certData

}
  
  request.post({url:'https://ipfs.infura.io:5001/api/v0/add', formData: formData}, function optionalCallback(err, httpResponse, body) {
 
      resolve("0x"+JSON.parse(body).Hash.toString('hex')); 

   })

})

}






