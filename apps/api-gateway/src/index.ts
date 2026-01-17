import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import config from "./config.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(
  cors({
    origin: config.cors.origins,
    credentials: true,
  })
);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Proxy routes to microservices
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: config.services.auth,
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "" },
  })
);



// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start server
app.listen(config.port, () => {
  console.log(`🚀 API Gateway running on http://localhost:${config.port}`);
});
