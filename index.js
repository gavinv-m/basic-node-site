import http from 'node:http';
import fs from 'node:fs/promises';
import url from 'node:url';

const page404 = await fs.readFile('404.html', 'utf-8');

const server = http.createServer(async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const fileName =
    parsedURL.pathname === '/'
      ? './index.html'
      : '.' + parsedURL.pathname + '.html';

  try {
    const data = await fs.readFile(fileName, { encoding: 'utf8' });
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write(data);
    return res.end();
  } catch (error) {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.write(page404);
    return res.end('404 Not Found');
  }
});

server.listen(8080);
