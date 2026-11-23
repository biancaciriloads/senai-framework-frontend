import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getPostById } from '../api/posts.js';

export default function PostDetailPage() {
  const { postId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post ?? null);
  const [status, setStatus] = useState(location.state?.post
    ? { kind: 'success', message: '' }
    : { kind: 'loading', message: 'Carregando publicação…' });

  useEffect(() => {
    if (location.state?.post && String(location.state.post.id) === postId) {
      setPost(location.state.post);
      setStatus({ kind: 'success', message: '' });
      return undefined;
    }

    const controller = new AbortController();

    async function loadPost() {
      setStatus({ kind: 'loading', message: 'Carregando publicação…' });
      try {
        const result = await getPostById(postId, controller.signal);
        setPost(result);
        setStatus({ kind: 'success', message: '' });
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error(`Não foi possível carregar a publicação ${postId}.`, error);
        setPost(null);
        setStatus({ kind: 'error', message: error.message || 'Não foi possível carregar esta publicação.' });
      }
    }

    loadPost();
    return () => controller.abort();
  }, [location.state, postId]);

  return (
    <section className="detail-page">
      <Link className="back-link" to="/">← Voltar ao mural</Link>
      {status.kind === 'loading' && <p className="state-panel" role="status">{status.message}</p>}
      {status.kind === 'error' && (
        <div className="state-panel state-panel-error" role="alert">
          <p>{status.message}</p>
          <Link to="/">Voltar às publicações</Link>
        </div>
      )}
      {status.kind === 'success' && post && (
        <article className="detail-card">
          <p className="section-kicker">PUBLICAÇÃO DA COMUNIDADE · #{post.id}</p>
          <h1>{post.title}</h1>
          <p className="detail-author">Compartilhado por uma pessoa curiosa</p>
          <div className="detail-divider" />
          <p className="detail-body">{post.body}</p>
        </article>
      )}
    </section>
  );
}
