import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultDataFile = fileURLToPath(new URL('../data/notes.json', import.meta.url));

export function createNoteStore({ dataFilePath = defaultDataFile } = {}) {
  const filePath = resolve(dataFilePath);
  let writeQueue = Promise.resolve();

  async function readNotes() {
    let content;
    try {
      content = await readFile(filePath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }

    const notes = JSON.parse(content);
    if (!Array.isArray(notes)) {
      throw new TypeError('O arquivo de notas precisa conter uma lista JSON.');
    }

    return notes;
  }

  async function writeNotes(notes) {
    await mkdir(dirname(filePath), { recursive: true });
    const temporaryPath = `${filePath}.${randomUUID()}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(notes, null, 2)}\n`, 'utf8');
    await rename(temporaryPath, filePath);
  }

  function mutateNotes(operation) {
    const result = writeQueue.then(operation);
    writeQueue = result.then(() => undefined, () => undefined);
    return result;
  }

  return {
    list: readNotes,
    async get(id) {
      return (await readNotes()).find((note) => note.id === id) || null;
    },
    create(input) {
      return mutateNotes(async () => {
        const notes = await readNotes();
        const note = {
          id: randomUUID(),
          titulo: input.titulo,
          texto: input.texto,
          criadoEm: new Date().toISOString(),
        };
        notes.push(note);
        await writeNotes(notes);
        return note;
      });
    },
    update(id, input) {
      return mutateNotes(async () => {
        const notes = await readNotes();
        const index = notes.findIndex((note) => note.id === id);
        if (index === -1) {
          return null;
        }

        const updatedNote = {
          ...notes[index],
          titulo: input.titulo,
          texto: input.texto,
          atualizadoEm: new Date().toISOString(),
        };
        notes[index] = updatedNote;
        await writeNotes(notes);
        return updatedNote;
      });
    },
    delete(id) {
      return mutateNotes(async () => {
        const notes = await readNotes();
        const remainingNotes = notes.filter((note) => note.id !== id);
        if (remainingNotes.length === notes.length) {
          return false;
        }

        await writeNotes(remainingNotes);
        return true;
      });
    },
  };
}
