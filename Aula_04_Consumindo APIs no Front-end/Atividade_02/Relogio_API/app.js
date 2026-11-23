import cors from "cors";
import express from "express";

const timeZone = "America/Sao_Paulo";
const allowedOrigins = (process.env.FRONTEND_ORIGINS ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origem não autorizada pelo CORS."));
    },
  }),
);

app.get("/", (_request, response) => {
  const now = new Date();

  response.json({
    dateTime: now.toISOString(),
    date: new Intl.DateTimeFormat("pt-BR", { timeZone }).format(now),
    time: new Intl.DateTimeFormat("pt-BR", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now),
    timeZone,
    status: "API do relógio funcionando!",
  });
});

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});
