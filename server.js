const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())

// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var fs = require('fs');
var dir = 'G://official/logger/';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
   
  fs.writeFile(`${dir}Output.txt`, "ak", (err) => { 
            
    // In case of a error throw err. 
    if (err) throw err; 
  })

}else{
  console.log("dir exist")
  if (fs.existsSync(`${dir}Output.txt`)) {
    console.log('file exists');
  } else {
    console.log('file not found!');
    fs.writeFile(`${dir}Output.txt`, "ak", (err) => { 
            
      // In case of a error throw err. 
      if (err) throw err; 
    })
  }
   
}


// Plain Node Js
// const server = http.createServer((req, res) => {
//   if(req.method === 'POST') {
//     console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
    
//     let data = '';
//     req.on('data', (chunk) => {
//       data += chunk;
//     });

//     // Once all the data has been received, parse it and respond
//     req.on('end', () => {
//       const body = JSON.parse(data);
//       console.log(body);
//       fs.appendFile('G://official/logger/Output.txt', body.name +"\r\n" , function (err) {
//         if (err) {
//           res.statusCode = 201;
//           res.end('Error..!');
//         } else {
//           // done
//           res.statusCode = 201;
//           res.end('Log created successfully');
//         }
//       })
     
//     });

//  }
// });

// server.listen(3000, () => {
//   console.log('Server listening on port 3000.');
// });


// Express js
app.post("/", function(req, res) { 

  fs.appendFile('G://official/logger/Output.txt', req.body.name +"\r\n" , function (err) {
        if (err) {
          res.statusCode = 201;
          res.end('Error..!');
        } else {
          // done
          res.statusCode = 201;
          res.end('{"msg":"Log created successfully"}');
        }
      })
}); 

app.listen(3000, function(){ 
  console.log("server is running on port 3000"); 
})

