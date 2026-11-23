function NoteForm({
  editingId,
  titulo,
  texto,
  isSaving,
  onTitleChange,
  onTextChange,
  onCancel,
  onSubmit,
}) {
  return (
    <form className="note-form" onSubmit={onSubmit}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">{editingId ? 'EDIÇÃO' : 'NOVA NOTA'}</p>
          <h2>{editingId ? 'Atualize sua ideia' : 'Escreva algo novo'}</h2>
        </div>
        <span className="form-symbol" aria-hidden="true">+</span>
      </div>

      <label htmlFor="titulo">Título</label>
      <input
        id="titulo"
        name="titulo"
        type="text"
        maxLength={120}
        placeholder="Ex.: Ideias para o projeto"
        value={titulo}
        onChange={(event) => onTitleChange(event.target.value)}
        required
      />

      <div className="label-row">
        <label htmlFor="texto">Sua nota</label>
        <span>{texto.length}/2000</span>
      </div>
      <textarea
        id="texto"
        name="texto"
        maxLength={2000}
        placeholder="Comece a escrever..."
        value={texto}
        onChange={(event) => onTextChange(event.target.value)}
        required
        rows={5}
      />

      <div className="form-actions">
        {editingId && (
          <button className="button button-secondary" type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button className="button button-primary" type="submit" disabled={isSaving}>
          {isSaving ? 'Salvando...' : editingId ? 'Salvar alterações' : 'Adicionar nota'}
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
