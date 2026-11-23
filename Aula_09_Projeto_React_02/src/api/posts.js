const postsEndpoint = 'https://jsonplaceholder.typicode.com/posts';

function isPost(value) {
  return value !== null
    && typeof value === 'object'
    && (typeof value.id === 'number' || typeof value.id === 'string')
    && typeof value.title === 'string'
    && typeof value.body === 'string';
}

async function readJson(response) {
  if (!response.ok) {
    throw new Error(`A API respondeu com o status ${response.status}.`);
  }

  return response.json();
}

export async function getPosts(signal) {
  const response = await fetch(`${postsEndpoint}?_limit=12`, { signal });
  const posts = await readJson(response);

  if (!Array.isArray(posts) || !posts.every(isPost)) {
    throw new Error('A resposta da API não contém uma lista válida de publicações.');
  }

  return posts;
}

export async function getPostById(postId, signal) {
  const response = await fetch(`${postsEndpoint}/${encodeURIComponent(postId)}`, { signal });
  const post = await readJson(response);

  if (!isPost(post)) {
    throw new Error('A publicação solicitada não foi encontrada.');
  }

  return post;
}

export async function createPost({ title, body }) {
  const response = await fetch(postsEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ title, body, userId: 1 }),
  });
  const post = await readJson(response);

  if (!isPost(post)) {
    throw new Error('A API não confirmou a criação da publicação.');
  }

  return post;
}
