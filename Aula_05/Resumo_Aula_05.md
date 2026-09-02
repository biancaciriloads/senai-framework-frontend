# Resumo da Aula 05: Criando APIs para o Front-end
**Instituição:** SENAI  
**Disciplina:** Frameworks Front-end  
**Professor:** Me. Deivison S. Takatu  

---

## 1. Sumário da Aula
- Revisão de Conceitos (Métodos HTTP, Endpoints, JSON, Servidores e Express)
- Desenvolvimento de uma API REST com suporte a **CRUD** (Create, Read, Update, Delete) utilizando arquivos JSON como persistência local
- Integração de Back-end com Front-end em React e Deploy (Render e Vercel)
- Documentação de APIs utilizando o **Postman**

---

## 2. Evolução do Projeto: Implementando um CRUD Completo
A aula expande o conceito anterior de apenas exibir data e hora para a criação de uma aplicação real de **Gerenciamento de Notas (Notes App)**, armazenando dados localmente por meio de um arquivo `data.json`.

### Rotas CRUD da API REST
1. **Listar Notas (`GET /api/notes`):** Retorna todas as notas salvas no arquivo.
2. **Criar Nota (`POST /api/notes`):** Adiciona uma nova nota exigindo `titulo` e `texto`. Cada registro recebe um ID único baseado em timestamp (`Date.now().toString()`).
3. **Obter Nota por ID (`GET /api/notes/:id`):** Retorna uma nota específica filtrada por seu identificador.
4. **Atualizar Nota (`PUT /api/notes/:id`):** Altera o título e o texto de uma nota existente.
5. **Excluir Nota (`DELETE /api/notes/:id`):** Remove permanentemente a nota correspondente ao ID.

---

## 3. Implementação Prática do Servidor (`server.js`)
O projeto utiliza o **Express.js** em conjunto com a biblioteca `body-parser` para processar dados JSON nas requisições e o CORS para liberação de acesso externo.

### Exemplo de Estrutura do Código Back-end
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
const FILE = 'data.json';

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Funções de Leitura e Escrita Auxiliares
function readNotes() {
  try {
    const data = fs.readFileSync(FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));
}

// Rotas da API
app.get('/api/notes', (req, res) => res.json(readNotes()));

app.post('/api/notes', (req, res) => {
  const notes = readNotes();
  const novaNota = {
    id: Date.now().toString(),
    titulo: req.body.titulo,
    texto: req.body.texto,
    criadoEm: new Date().toISOString()
  };
  notes.push(novaNota);
  saveNotes(notes);
  res.json(novaNota);
});

app.put('/api/notes/:id', (req, res) => {
  const notes = readNotes();
  const index = notes.findIndex(n => n.id === req.params.id);
  if (index >= 0) {
    notes[index].titulo = req.body.titulo;
    notes[index].texto = req.body.texto;
    saveNotes(notes);
    res.json(notes[index]);
  } else {
    res.status(404).json({ erro: 'Nota não encontrada' });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const notes = readNotes();
  const novasNotas = notes.filter(n => n.id !== req.params.id);
  saveNotes(novasNotas);
  res.json({ mensagem: 'Nota removida' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

---

## 4. Documentação de APIs com Postman
O **Postman** é uma ferramenta indispensável para testes, simulação e documentação técnica de endpoints.
- **Principais Recursos:** Envio de requisições HTTP variadas (`GET`, `POST`, `PUT`, `DELETE`), criação de coleções compartilhadas para equipes, variáveis de ambiente, simulação de servidores (*Mock Servers*) e testes automatizados.
- **Aplicação na Atividade:** Criação de uma coleção estruturada documentando todas as rotas CRUD da API desenvolvida, detalhando parâmetros de entrada, métodos e códigos de status de resposta (ex: `200 OK`, `404 Not Found`).

---

## 5. Atividades Práticas e Implantação (Deploy)
1. **Back-end:** Publicar a API desenvolvida com Express no GitHub e realizar o deploy na nuvem utilizando a plataforma **Render**.
2. **Front-end:** Desenvolver a interface em React para interagir com a API (consumindo as rotas CRUD) e hospedar a aplicação na **Vercel**, atualizando as URLs de requisição para o endpoint online do Render.
3. **Documentação:** Organizar a entrega em um relatório contendo capturas de tela do código, da aplicação em funcionamento, links dos repositórios no GitHub, o link do deploy na Vercel e a coleção do Postman estruturada.

---

## 6. Referências Bibliográficas Principais
- SOUZA, Natan. *Bootstrap 4: conheça a biblioteca front-end mais utilizada no mundo.* São Paulo: Casa do Código, 2018.
- MACHADO, Kheronn Khennedy. *Angular 11 e Firebase...* São Paulo: Casa do Código, 2021.
- EIS, Diego. *Guia Front-end: o caminho das pedras para ser um dev front-end.* São Paulo: Casa do Código, 2015.