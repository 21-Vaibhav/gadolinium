import "dotenv/config";
import { hono } from "./routes"; // Ensure hono is exported from routes.ts
import { serve } from "@hono/node-server";

serve(hono, (info) => {
  console.log(`Server is running on port ${info.port}`);
});
