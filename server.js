const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 443;

const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};

app.use(express.static(path.join(__dirname)));

https.createServer(options, app).listen(PORT, () => {
  console.log(`🚀 HTTPS server running at https://localhost`);
});
