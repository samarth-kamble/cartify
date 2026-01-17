const config = {
  port: Number(process.env.PORT) || 8080,
  services: {
    auth: process.env.AUTH_SERVICE_URL || "http://localhost:6000",
  },
  cors: {
    origins: [
      "http://localhost:3000",

    ],
  },
};

export default config;
