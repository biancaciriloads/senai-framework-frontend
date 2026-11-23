import { Link } from 'react-router-dom';

export default function PostCard({ post, index }) {
  const postId = encodeURIComponent(post.id);

  return (
    <article className={`post-card post-card-tone-${index % 4}`}>
      <div className="post-card-top">
        <span className="post-category">
          <span aria-hidden="true">{['✳', '◈', '✦', '◎'][index % 4]}</span>
          {['IDEIAS', 'DESIGN', 'TECNOLOGIA', 'CULTURA'][index % 4]}
        </span>
        <span className="post-number">Nº {String(index + 1).padStart(2, '0')}</span>
      </div>
      <h2>{post.title}</h2>
      <p className="post-excerpt">{post.body}</p>
      <div className="post-card-bottom">
        <span className="author-avatar" aria-hidden="true">{String(post.userId ?? 1).padStart(2, '0')}</span>
        <span className="author-label">Pessoa curiosa</span>
        <Link className="read-link" to={`/posts/${postId}`} state={{ post }}>
          Ler ideia <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
