import { createApp } from './src/app.js';

const port = Number(process.env.PORT) || 4321;
const app = createApp();

app.listen(port, () => {
  console.log(`API de notas disponível em http://localhost:${port}`);
});
