const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const frontendDir = path.join(rootDir, 'Frontend');
const distDir = path.join(frontendDir, 'dist');
const port = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal server error');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  let requestPath = req.url.split('?')[0];
  if (requestPath === '/' || requestPath === '') {
    requestPath = '/index.html';
  }

  const normalizedPath = path.normalize(requestPath).replace(/^\/+/, '');
  const filePath = path.join(distDir, normalizedPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    sendFile(res, filePath);
    return;
  }

  const fallbackPath = path.join(distDir, 'index.html');
  if (fs.existsSync(fallbackPath)) {
    sendFile(res, fallbackPath);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Frontend build not found. Run the frontend build first.');
});

server.listen(port, () => {
  console.log(`Cropzora server is running on http://localhost:${port}`);
});
