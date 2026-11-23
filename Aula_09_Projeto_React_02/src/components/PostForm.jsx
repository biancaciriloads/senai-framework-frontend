import { useState } from 'react';
import { createPost } from '../api/posts.js';

const initialForm = { title: '', body: '' };

export default function PostForm({ onPostCreated }) {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const title = form.title.trim();
    const body = form.body.trim();

    if (!title || !body) {
      setError('Preencha o título e a descrição antes de publicar.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const post = await createPost({ title, body });
      onPostCreated({ ...post, title, body });
      setForm(initialForm);
    } catch (submitError) {
      console.error('Não foi possível enviar a publicação.', submitError);
      setError(submitError.message || 'Não foi possível enviar sua publicação.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="compose-panel" id="nova-publicacao" aria-labelledby="compose-title">
      <div className="compose-heading">
        <span className="compose-icon" aria-hidden="true">↗</span>
        <div>
          <p className="section-kicker">UMA IDEIA PODE COMEÇAR AQUI</p>
          <h2 id="compose-title">Compartilhe uma descoberta</h2>
        </div>
      </div>
      <form className="compose-form" onSubmit={handleSubmit}>
        <label>
          <span>Título</span>
          <input
            name="title"
            value={form.title}
            onChange={updateField}
            placeholder="Dê um título à sua ideia"
            maxLength={100}
            required
          />
        </label>
        <label>
          <span>Descrição</span>
          <textarea
            name="body"
            value={form.body}
            onChange={updateField}
            placeholder="O que você gostaria de compartilhar?"
            rows={4}
            maxLength={500}
            required
          />
        </label>
        {error && <p className="form-message form-message-error" role="alert">{error}</p>}
        <div className="form-footer">
          <p>Seu texto será enviado à API de demonstração.</p>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando…' : 'Publicar ideia'} <span aria-hidden="true">↗</span>
          </button>
        </div>
      </form>
    </section>
  );
}
