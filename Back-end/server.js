
const http = require('http');  //..Called up on NodeJS to use the http protocol to communicate with server..
const app = require('express')(); //..App page that is called to communicate with the server.
app.set('port', process.env.PORT || 3000); //..sThe env. or port that the server will be listening to.





const server = http.createServer(app);

// const server = http.createServer((req, res) => {
//     res.end('Voila la reponse de Mars et de la lune !');
// });


server.listen(process.env.PORT || 3000);
console.log('Listening on port 3000'); 