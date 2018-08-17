const net = require('net');
const PORT = 8080;
const { helium } = require('./helium.js');

const server = net.createServer( client => {
  client.setEncoding('utf8');
  client.on('data', (data) => {
    // console.log(data);
    let req = data.toString().split('\n');
    console.log(req);
    let reqLine = req[0].split(" ");
    let uri = reqLine[1];
    console.log(uri); // outputs as home

    if (uri === '/helium') {
      const date = new Date();
      const status = "HTTP/1.1 200 OK";
      const serverName = "coolServer";
      const message = `${status}\nServer: ${serverName}\nDate: ${date} \nContent-Type: *\n\n${helium}`;

      client.write(message);
      client.end();
      // console.log('you are home');
    } else {
      console.log('not home');
    }

  });
});

server.listen(PORT, () => {
  console.log('Welcome to the Matrix on port ', PORT);
})