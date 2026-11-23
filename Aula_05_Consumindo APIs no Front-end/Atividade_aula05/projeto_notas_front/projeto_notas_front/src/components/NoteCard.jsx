function NoteCard({ note, onEdit, onDelete }) {
  const date = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(note.atualizadoEm || note.criadoEm));

  return (
    <li className="note-card">
      <div className="note-card-top">
        <span className="note-date">{date}</span>
        <div className="note-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => onEdit(note)}
            aria-label={`Editar ${note.titulo}`}
            title="Editar nota"
          >
            Editar
          </button>
          <button
            className="icon-button icon-button-danger"
            type="button"
            onClick={() => onDelete(note)}
            aria-label={`Excluir ${note.titulo}`}
            title="Excluir nota"
          >
            Excluir
          </button>
        </div>
      </div>
      <h3>{note.titulo}</h3>
      <p className="note-text">{note.texto}</p>
    </li>
  );
}

export default NoteCard;
