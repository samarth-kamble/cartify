import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";

const app = express();
const PORT = Number(process.env.PORT) || 6000;

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:8080",
    ],
    credentials: true,
  })
);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "auth-service" });
});

// Mount Better Auth handler - handles all /api/auth/* routes
app.all("/api/auth/*splat", toNodeHandler(auth));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`🔐 Auth Service running on http://localhost:${PORT}`);
});
