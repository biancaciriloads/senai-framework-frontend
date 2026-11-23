import cors from 'cors';
import express from 'express';
import { createNoteStore } from './noteStore.js';

const defaultOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

function parseNote(body) {
  const titulo = typeof body?.titulo === 'string' ? body.titulo.trim() : '';
  const texto = typeof body?.texto === 'string' ? body.texto.trim() : '';

  if (!titulo || !texto) {
    return { error: 'Informe um título e o conteúdo da nota.' };
  }

  return { titulo, texto };
}

export function createApp({
  dataFilePath,
  allowedOrigins = (process.env.CORS_ORIGINS || defaultOrigins.join(','))
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
} = {}) {
  const app = express();
  const notes = createNoteStore({ dataFilePath });

  app.use(cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.includes(origin));
    },
  }));
  app.use(express.json({ limit: '10kb' }));

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  app.get('/api/notes', async (_request, response, next) => {
    try {
      response.json(await notes.list());
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/notes', async (request, response, next) => {
    const noteInput = parseNote(request.body);

    if (noteInput.error) {
      response.status(400).json({ erro: noteInput.error });
      return;
    }

    try {
      response.status(201).json(await notes.create(noteInput));
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/notes/:id', async (request, response, next) => {
    try {
      const note = await notes.get(request.params.id);
      if (!note) {
        response.status(404).json({ erro: 'Nota não encontrada.' });
        return;
      }

      response.json(note);
    } catch (error) {
      next(error);
    }
  });

  app.put('/api/notes/:id', async (request, response, next) => {
    const noteInput = parseNote(request.body);

    if (noteInput.error) {
      response.status(400).json({ erro: noteInput.error });
      return;
    }

    try {
      const note = await notes.update(request.params.id, noteInput);
      if (!note) {
        response.status(404).json({ erro: 'Nota não encontrada.' });
        return;
      }

      response.json(note);
    } catch (error) {
      next(error);
    }
  });

  app.delete('/api/notes/:id', async (request, response, next) => {
    try {
      const deleted = await notes.delete(request.params.id);
      if (!deleted) {
        response.status(404).json({ erro: 'Nota não encontrada.' });
        return;
      }

      response.json({ mensagem: 'Nota removida.' });
    } catch (error) {
      next(error);
    }
  });

  app.use('/api', (_request, response) => {
    response.status(404).json({ erro: 'Rota não encontrada.' });
  });

  app.use((error, _request, response, next) => {
    if (response.headersSent) {
      next(error);
      return;
    }

    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      response.status(400).json({ erro: 'O corpo da requisição deve conter JSON válido.' });
      return;
    }

    console.error(error);
    response.status(500).json({ erro: 'Erro interno ao processar a requisição.' });
  });

  return app;
}
