Bun.serve({
  routes: {
    "/": async () =>
      new Response(await Bun.file("index.html").bytes(), {
        headers: {
          "Content-Type": "text/html",
        },
      }),

    "/api/setCookies": async (req) => {
      // TODO: Secure this

      if (req.method === "POST") {
        const body = (await req.json()) as Record<string, string>;
        for (const [k, v] of Object.entries(body)) {
          req.cookies.set(k, v, {
            path: "/",
            httpOnly: true,
            sameSite: "none",
            secure: true,
          });
        }
      }

      return new Response("ok", {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:9087", // The `npx serve` origin. Can't use `*` here cause of allowing credentials.
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Credentials": "true",
        },
      });
    },
    "/ws": async (req, server) => {
      console.log("WEBSOCKET", req.headers);

      if (server.upgrade(req)) return;
      return new Response("Upgrade failed", { status: 500 });
    },
  },

  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },

  websocket: {
    message(ws, message) {
      ws.send(message);
    },
  },
});
