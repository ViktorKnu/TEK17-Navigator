const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT) || 5173;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const filePath = resolveStaticPath(url.pathname);

  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath)] ?? "application/octet-stream",
    });
    response.end(data);
  });
});

function resolveStaticPath(pathname) {
  let requestedPath;
  try {
    requestedPath = pathname === "/" ? "index.html" : decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const relativePath = requestedPath.replace(/^[/\\]+/, "");
  const filePath = path.resolve(root, relativePath);
  const relativeToRoot = path.relative(root, filePath);
  if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) return null;
  return filePath;
}

server.listen(port, "127.0.0.1", () => {
  console.log(`TEK17 Navigator kjører på http://127.0.0.1:${port}`);
});
