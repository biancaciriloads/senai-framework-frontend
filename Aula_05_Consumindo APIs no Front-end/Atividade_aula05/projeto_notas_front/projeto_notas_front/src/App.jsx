import React, { useState, useEffect } from 'react';
import './App.css';

// URL da API publicada no Render
const API_URL = 'https://projeto-notas-api.onrender.com/api/notes';

function App() {
    const [notes, setNotes] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Buscar notas ao carregar a página
    useEffect(() => {
        carregarNotas();
    }, []);

    async function carregarNotas() {
        setLoading(true);
        try {
            const resposta = await fetch(API_URL);
            const dados = await resposta.json();
            setNotes(dados);
        } catch (erro) {
            console.error('Erro ao carregar notas:', erro);
        } finally {
            setLoading(false);
        }
    }

    // Cadastrar ou Atualizar nota
    async function handleSubmit(e) {
        e.preventDefault();
        if (!titulo || !texto) return;

        const method = editandoId ? 'PUT' : 'POST';
        const url = editandoId ? `${API_URL}/${editandoId}` : API_URL;

        try {
            const resposta = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titulo, texto })
            });

            if (resposta.ok) {
                setTitulo('');
                setTexto('');
                setEditandoId(null);
                carregarNotas();
            }
        } catch (erro) {
            console.error('Erro ao salvar nota:', erro);
        }
    }

    // Preencher campos para edição
    function iniciarEdicao(nota) {
        setEditandoId(nota.id);
        setTitulo(nota.titulo);
        setTexto(nota.texto);
    }

    // Excluir nota
    async function excluirNota(id) {
        if (!window.confirm('Deseja realmente excluir esta nota?')) return;

        try {
            const resposta = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (resposta.ok) {
                carregarNotas();
            }
        } catch (erro) {
            console.error('Erro ao excluir nota:', erro);
        }
    }

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '650px', margin: '0 auto' }}>
            <h1>📝 Gerenciador de Notas</h1>
            <p style={{ color: '#666', fontSize: '14px' }}>Conectado à API: <code>{API_URL}</code></p>

            {/* Formulário */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h2>{editandoId ? 'Editar Nota' : 'Nova Nota'}</h2>
                <input
                    type="text"
                    placeholder="Título da nota"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <textarea
                    placeholder="Escreva o conteúdo da sua nota aqui..."
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    required
                    style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', height: '100px', resize: 'vertical' }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ padding: '10px 15px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {editandoId ? 'Atualizar Nota' : 'Criar Nota'}
                    </button>
                    {editandoId && (
                        <button type="button" onClick={() => { setEditandoId(null); setTitulo(''); setTexto(''); }} style={{ padding: '10px 15px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* Lista de Notas */}
            <h2>Minhas Notas</h2>
            {loading && <p>Carregando notas do servidor...</p>}
            {!loading && notes.length === 0 && <p>Nenhuma nota cadastrada no momento.</p>}

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {notes.map((nota) => (
                    <li key={nota.id} style={{ border: '1px solid #e0e0e0', padding: '15px', marginBottom: '15px', borderRadius: '6px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{nota.titulo}</h3>
                        <p style={{ margin: '0 0 12px 0', color: '#555', whiteSpace: 'pre-wrap' }}>{nota.texto}</p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => iniciarEdicao(nota)} style={{ padding: '6px 12px', background: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Editar</button>
                            <button onClick={() => excluirNota(nota.id)} style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;