const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const publicFiles = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/styles.css", ["styles.css", "text/css; charset=utf-8"]],
  ["/exhibits.css", ["exhibits.css", "text/css; charset=utf-8"]],
  ["/app.js", ["app.js", "text/javascript; charset=utf-8"]],
  ["/assets/library.jpg", ["assets/library.jpg", "image/jpeg"]],
]);

http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || `localhost:${port}`}`);
  const pathname = url.pathname;
  let file = publicFiles.get(pathname);
  const exhibit = pathname.match(/^\/exhibit\/([a-z0-9-]+)\/?$/);
  const shareImage = pathname.match(/^\/share\/([a-z0-9-]+\.png)$/);
  const registryModule = pathname.match(/^\/exhibits\/([a-z-]+)\.js$/);
  if (exhibit) file = [path.join("dist", "exhibit", exhibit[1], "index.html"), "text/html; charset=utf-8"];
  if (shareImage) file = [path.join("share", shareImage[1]), "image/png"];
  if (registryModule) file = [path.join("exhibits", `${registryModule[1]}.js`), "text/javascript; charset=utf-8"];
  if (!file) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("This exhibit is not part of the collection. Please consider applying for exhibition if it's bad enough.");
    return;
  }
  try {
    let content = await fs.readFile(path.join(root, file[0]));
    if (file[1].startsWith("text/html")) content = Buffer.from(content.toString().replaceAll("__SITE_ORIGIN__", url.origin));
    response.writeHead(200, { "Content-Type": file[1], "X-Content-Type-Options": "nosniff" });
    response.end(content);
  } catch (error) {
    console.error("Unable to serve file:", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("The museum is temporarily unable to display this exhibit.");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`The museum is open at http://localhost:${port}`);
});
