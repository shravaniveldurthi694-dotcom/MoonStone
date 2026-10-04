const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent((request.url || '/').split('?')[0]);
  const requestedPath = urlPath === '/' ? '/index.html' : urlPath;
  const filePath = path.join(process.cwd(), requestedPath);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.statusCode = 404;
      response.end('Not found');
      return;
    }
    response.end(data);
  });
});

server.listen(8000, '127.0.0.1');
