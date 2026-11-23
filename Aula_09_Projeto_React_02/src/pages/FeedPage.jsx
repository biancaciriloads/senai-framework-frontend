import { useEffect, useMemo, useState } from 'react';
import PostCard from '../components/PostCard.jsx';
import PostForm from '../components/PostForm.jsx';
import { getPosts } from '../api/posts.js';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState({ kind: 'loading', message: 'Buscando ideias da comunidade…' });

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      try {
        const results = await getPosts(controller.signal);
        setPosts(results);
        setStatus({ kind: 'success', message: '' });
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error('Não foi possível carregar as publicações.', error);
        setStatus({ kind: 'error', message: error.message || 'Não foi possível carregar as publicações.' });
      }
    }

    loadPosts();
    return () => controller.abort();
  }, []);

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
    if (!normalizedQuery) return posts;

    return posts.filter((post) => (
      `${post.title} ${post.body}`.toLocaleLowerCase('pt-BR').includes(normalizedQuery)
    ));
  }, [posts, query]);

  function handlePostCreated(post) {
    setPosts((currentPosts) => [post, ...currentPosts]);
    setStatus({ kind: 'success', message: 'Ideia enviada! A API de demonstração confirma o POST, mas não salva os dados permanentemente.' });
  }

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="hero-kicker"><span aria-hidden="true">✦</span> UM MURAL PARA MENTES CURIOSAS</p>
          <h1>Ideias que<br /><span>merecem circular.</span></h1>
          <p className="hero-description">
            Pequenas descobertas, referências e pensamentos para inspirar
            novas conversas.
          </p>
          <a className="hero-link" href="#feed">Explorar publicações <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" role="img" aria-label="Ilustração abstrata de formas coloridas">
          <span className="art-shape art-shape-one" />
          <span className="art-shape art-shape-two" />
          <span className="art-shape art-shape-three" />
          <span className="art-caption">CURIOSITY<br />IN MOTION</span>
        </div>
      </section>

      <section className="feed-section" id="feed" aria-labelledby="feed-title">
        <div className="feed-heading">
          <div>
            <p className="section-kicker">FEED DA COMUNIDADE</p>
            <h2 id="feed-title">Descobertas recentes</h2>
          </div>
          <span className="feed-count">{visiblePosts.length} publicações</span>
        </div>
        {status.kind === 'success' && status.message && (
          <p className="form-message form-message-success" role="status">{status.message}</p>
        )}
        <div className="feed-toolbar">
          <p>IDEIAS PARA VER O MUNDO DE OUTRO JEITO</p>
          <label className="search-field">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">Buscar publicações</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar no mural"
            />
          </label>
        </div>
        {status.kind === 'loading' && <p className="state-panel" role="status">{status.message}</p>}
        {status.kind === 'error' && (
          <div className="state-panel state-panel-error" role="alert">
            <p>{status.message}</p>
            <button type="button" onClick={() => window.location.reload()}>Tentar novamente</button>
          </div>
        )}
        {status.kind === 'success' && (
          visiblePosts.length > 0 ? (
            <div className="post-grid">
              {visiblePosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <p className="state-panel" role="status">Nenhuma publicação corresponde à sua busca.</p>
          )
        )}
      </section>

      <PostForm onPostCreated={handlePostCreated} />
    </>
  );
}
