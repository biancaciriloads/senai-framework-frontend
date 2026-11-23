import { useEffect, useMemo, useState } from 'react';
import './App.css';
import NoteCard from './components/NoteCard.jsx';
import NoteForm from './components/NoteForm.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4321/api/notes';

async function requestNotes(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.erro || 'Não foi possível concluir a operação.');
  }

  return result;
}

function App() {
  const [notes, setNotes] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadNotes() {
      setIsLoading(true);
      setError('');

      try {
        const data = await requestNotes(API_URL, { signal: controller.signal });
        if (active) {
          setNotes(data);
        }
      } catch (loadError) {
        if (active && loadError.name !== 'AbortError') {
          setError(loadError.message || 'Não foi possível carregar as notas.');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadNotes();
    return () => {
      active = false;
      controller.abort();
    };
  }, [refreshVersion]);

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('pt-BR');
    return notes.filter((note) => (
      !query
      || note.titulo.toLocaleLowerCase('pt-BR').includes(query)
      || note.texto.toLocaleLowerCase('pt-BR').includes(query)
    ));
  }, [notes, search]);

  function resetForm() {
    setTitulo('');
    setTexto('');
    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setNotice('');
    setIsSaving(true);

    const isEditing = Boolean(editingId);

    try {
      await requestNotes(
        isEditing ? `${API_URL}/${encodeURIComponent(editingId)}` : API_URL,
        {
          method: isEditing ? 'PUT' : 'POST',
          body: JSON.stringify({ titulo, texto }),
        },
      );
      resetForm();
      setNotice(isEditing ? 'Nota atualizada com sucesso.' : 'Nota criada com sucesso.');
      setRefreshVersion((version) => version + 1);
    } catch (saveError) {
      setError(saveError.message || 'Não foi possível salvar a nota.');
    } finally {
      setIsSaving(false);
    }
  }

  function startEditing(note) {
    setEditingId(note.id);
    setTitulo(note.titulo);
    setTexto(note.texto);
    setNotice('');
    setError('');
    document.getElementById('titulo')?.focus();
  }

  async function deleteNote(note) {
    setError('');
    setNotice('');

    try {
      await requestNotes(`${API_URL}/${encodeURIComponent(note.id)}`, {
        method: 'DELETE',
      });
      if (editingId === note.id) {
        resetForm();
      }
      setNotice('Nota excluída com sucesso.');
      setRefreshVersion((version) => version + 1);
    } catch (deleteError) {
      setError(deleteError.message || 'Não foi possível excluir a nota.');
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Notas, página inicial">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span>Notas<span className="brand-period">.</span></span>
        </a>
        <span className="api-indicator">
          <span className="api-indicator-dot" aria-hidden="true" />
          API REST
        </span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">SEU ESPAÇO DE IDEIAS</p>
        <h1 id="page-title">Um lugar para organizar <span>o que importa.</span></h1>
        <p className="intro-copy">
          Registre lembretes, planos e pensamentos. Tudo em um só lugar.
        </p>
      </section>

      <section className="workspace" aria-label="Gerenciador de notas">
        <NoteForm
          editingId={editingId}
          titulo={titulo}
          texto={texto}
          isSaving={isSaving}
          onTitleChange={setTitulo}
          onTextChange={setTexto}
          onCancel={resetForm}
          onSubmit={handleSubmit}
        />

        <section className="notes-section" aria-labelledby="notes-title">
          <div className="notes-heading">
            <div>
              <p className="eyebrow">SUA COLEÇÃO</p>
              <h2 id="notes-title">Suas notas <span className="note-count">{notes.length}</span></h2>
            </div>
            <button
              className="refresh-button"
              type="button"
              onClick={() => setRefreshVersion((version) => version + 1)}
              disabled={isLoading}
              aria-label="Atualizar notas"
              title="Atualizar notas"
            >
              ↻
            </button>
          </div>

          <label className="search-field" htmlFor="buscar">
            <span aria-hidden="true">⌕</span>
            <input
              id="buscar"
              type="search"
              placeholder="Buscar nas suas notas"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          {error && <p className="feedback feedback-error" role="alert">{error}</p>}
          {notice && <p className="feedback feedback-success" role="status">{notice}</p>}
          {isLoading && <p className="empty-state" role="status">Carregando suas notas...</p>}
          {!isLoading && !error && notes.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">✎</span>
              <h3>Ainda não há notas</h3>
              <p>Adicione sua primeira ideia pelo formulário ao lado.</p>
            </div>
          )}
          {!isLoading && !error && notes.length > 0 && filteredNotes.length === 0 && (
            <p className="empty-state">Nenhuma nota corresponde à sua busca.</p>
          )}

          <ul className="note-list">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={startEditing}
                onDelete={deleteNote}
              />
            ))}
          </ul>
        </section>
      </section>

      <footer className="app-footer">
        <span>Suas ideias, sempre por perto.</span>
        <span>API REST · Express</span>
      </footer>
    </main>
  );
}

export default App;
