var PDFDocument = require('pdfkit');
var blobStream = require('blob-stream');
var request = require('request');
var qr = require('qr-image');
var FormData = require('form-data');
var fs = require('fs');
var Promise = require("bluebird");


module.exports = function(transHash) {





var lorem="This is dummy certificate generated for demo purpose"





var doc = new PDFDocument();
var stream = doc.pipe(blobStream());


// draw some text
doc.fontSize(25)
   .text('Certificate', 100, 80);

doc.image('./icon/logo1.png', {
  fit: [200, 200],
  align: 'center'
}).text('', 0, 0)
   
// and some justified text wrapped into columns
doc.text('Certificate on blockchain', 100, 300)
   .font('Times-Roman', 13)
   .moveDown()
   .text(lorem, {
     width: 412,
     align: 'justify',
     indent: 30,
     columns: 2,
     height: 300,
     ellipsis: true
   });
   
// end and display the document in the iframe to the right
if(transHash){
var qr_svg = qr.imageSync(transHash, { type: 'png' });
doc.image(qr_svg, {
  fit: [100, 100],
  align: 'center'
}).text('', 0, 0)

}



doc.end();



return new Promise(function(resolve, reject) {
      
stream.on('finish', function() {

  resolve(Buffer.concat(stream._chunks));


});

       
})






}





