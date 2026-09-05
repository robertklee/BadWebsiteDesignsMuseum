const shareRoute = /^\/exhibit\/([a-z0-9-]+)\/?$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let assetPath = url.pathname;

    if (url.pathname === "/") {
      assetPath = "/index.html";
    } else {
      const match = url.pathname.match(shareRoute);
      if (match) assetPath = `/exhibit/${match[1]}/index.html`;
    }

    const assetUrl = new URL(assetPath, url);
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) return response;

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    return new Response((await response.text()).replaceAll("__SITE_ORIGIN__", url.origin), {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
