import { Hono } from "hono";
import router from "./routes/web";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("*", async (c, next) => {
  console.log(`[Server] Incoming request: ${c.req.method} ${c.req.path}`);
  await next();
  console.log(`[Server] Response sent for: ${c.req.path}`);
});

app.use("/css/*", serveStatic({ root: "./src/public" }));
app.route("/", router);

export default {
  port: 3000,
  fetch: app.fetch,
};
