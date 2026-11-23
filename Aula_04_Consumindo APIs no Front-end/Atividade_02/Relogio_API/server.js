import { app } from "./app.js";

const port = Number(process.env.PORT) || 4320;

app.listen(port, "0.0.0.0", () => {
  console.log(`API do relógio disponível na porta ${port}.`);
});
