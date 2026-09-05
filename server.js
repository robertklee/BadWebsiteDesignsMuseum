const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const publicFiles = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/styles.css", ["styles.css", "text/css; charset=utf-8"]],
  ["/app.js", ["app.js", "text/javascript; charset=utf-8"]],
  ["/additional-exhibits.js", ["additional-exhibits.js", "text/javascript; charset=utf-8"]],
  ["/arcade-exhibits.js", ["arcade-exhibits.js", "text/javascript; charset=utf-8"]],
  ["/arcade-exhibits.css", ["arcade-exhibits.css", "text/css; charset=utf-8"]],
]);

http.createServer(async (request, response) => {
  const file = publicFiles.get(new URL(request.url, "http://localhost").pathname);
  if (!file) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("This exhibit does not exist. Even we have standards.");
    return;
  }
  try {
    const content = await fs.readFile(path.join(root, file[0]));
    response.writeHead(200, { "Content-Type": file[1], "X-Content-Type-Options": "nosniff" });
    response.end(content);
  } catch (error) {
    console.error("Unable to serve file:", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("The museum is having a genuinely unintended technical difficulty.");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`The museum is open at http://localhost:${port}`);
});
