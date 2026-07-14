import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer, request as httpRequest } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = resolve(__dirname, 'dist');
const port = Number(process.env.PORT || process.argv[2] || 8080);
const backendUrl = new URL(process.env.BACKEND_URL || 'http://127.0.0.1:5000');
const proxyPrefixes = ['/api', '/admin', '/uploads', '/health'];

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function shouldProxy(pathname) {
  return proxyPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function proxyToBackend(req, res) {
  const target = new URL(req.url, backendUrl);
  const headers = {
    ...req.headers,
    'x-forwarded-host': req.headers.host || '',
    'x-forwarded-proto': req.headers['x-forwarded-proto'] || 'http',
    'x-forwarded-for': req.socket.remoteAddress || '',
  };

  const proxyReq = httpRequest(
    {
      protocol: backendUrl.protocol,
      hostname: backendUrl.hostname,
      port: backendUrl.port,
      method: req.method,
      path: `${target.pathname}${target.search}`,
      headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );

  proxyReq.on('error', (error) => {
    console.error(`Backend proxy failed: ${error.message}`);
    res.writeHead(502, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Backend is unavailable' }));
  });

  req.pipe(proxyReq);
}

function safeStaticPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const normalized = normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const filePath = resolve(join(distDir, normalized));
  return filePath.startsWith(distDir) ? filePath : null;
}

function serveFile(filePath, res) {
  const extension = extname(filePath).toLowerCase();
  res.writeHead(200, {
    'content-type': mimeTypes[extension] || 'application/octet-stream',
  });
  createReadStream(filePath).pipe(res);
}

function serveStatic(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let filePath = safeStaticPath(pathname);

  if (filePath && existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
  }

  if (filePath && existsSync(filePath) && statSync(filePath).isFile()) {
    serveFile(filePath, res);
    return;
  }

  const fallback = join(distDir, 'index.html');
  if (existsSync(fallback)) {
    serveFile(fallback, res);
    return;
  }

  res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
  res.end('Build output not found. Run npm run build first.');
}

createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (pathname === '/admin') {
    res.writeHead(308, { location: '/admin/' });
    res.end();
    return;
  }

  if (shouldProxy(pathname)) {
    proxyToBackend(req, res);
    return;
  }

  serveStatic(req, res);
}).listen(port, '0.0.0.0', () => {
  console.log(`byNolo frontend listening on http://0.0.0.0:${port}`);
  console.log(`Proxying /api, /admin, /uploads, and /health to ${backendUrl.origin}`);
});
