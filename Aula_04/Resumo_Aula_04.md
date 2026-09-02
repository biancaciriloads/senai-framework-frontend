# Resumo da Aula 04: Consumindo APIs no Front-end
**Instituição:** SENAI  
**Disciplina:** Frameworks Front-end  
**Professor:** Me. Deivison S. Takatu  

---

## 1. Sumário da Aula
- Conceitos de API, Protocolo HTTP, Endpoints e Formato JSON
- Servidor Backend, Web Service e Criação de API REST com Express.js
- Hospedagem e Simulação de Web Services com o Render
- Atividades Práticas 01 e 02 (Análise de repositórios e consumo/deploy de API)

---

## 2. Conceitos Fundamentais de APIs e Web
- **API (*Application Programming Interface*):** Conjunto de protocolos, rotinas e ferramentas que permite que diferentes sistemas de software se comuniquem entre si.
- **Estilo Arquitetural REST (*Representational State Transfer*):**
  - Comunicação cliente-servidor sem estado (*stateless*).
  - Uso padrão de métodos HTTP.
  - Identificação de recursos por URIs.
  - Representação de dados leve (como JSON).

### Protocolo HTTP e Métodos Principais
O protocolo HTTP rege a comunicação na web sob o modelo cliente-servidor (mensagens baseadas em texto e independentes). Os principais métodos são:
- **`GET`:** Recupera informações do servidor (seguro e idempotente).
- **`POST`:** Cria novos recursos no servidor (não idempotente).
- **`PUT` / `PATCH`:** Atualizam recursos existentes (PUT substitui totalmente; PATCH atualiza parcialmente).
- **`DELETE`:** Remove um recurso específico (idempotente).

### Endpoints e Formato JSON
- **Endpoint:** URL específica que fornece acesso a um recurso ou funcionalidade em uma API (ponto de contato entre cliente e servidor).
- **JSON (*JavaScript Object Notation*):** Formato leve estruturado em coleções de pares nome/valor (objetos) e listas ordenadas de valores (arrays), amplamente legível por humanos e máquinas.

---

## 3. Criando uma API REST com Express.js
O **Express.js** é um framework minimalista e flexível para Node.js que simplifica a criação de servidores web e rotas em comparação ao módulo HTTP puro do Node.

### Passos para Criar uma API Básica
1. **Inicializar o projeto e instalar dependências:**
   ```bash
   npm install express cors
   ```
2. **Estrutura básica (`api.js`):**
   ```javascript
   import express from 'express';
   import cors from 'cors';

   const app = express();
   app.use(cors());

   app.get('/', (req, res) => {
     res.json({
       date: new Date().toLocaleString('pt-BR'),
       status: 'API no Render funcionando!'
     });
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`);
   });
   ```

---

## 4. Deploy e Hospedagem com o Render
O **Render** é uma plataforma moderna de nuvem para hospedar aplicações e microsserviços com facilidade e suporte a SSL gratuito.
- **Passos para Deploy:**
  1. Enviar o código da API para um repositório no GitHub.
  2. Acessar o painel do Render (`dashboard.render.com`).
  3. Criar um novo **Web Service** conectando o repositório GitHub correspondente.
  4. Configurar os comandos de *Build* (`node` ou vazio) e *Start* (`node api.js`), gerando a URL pública online (ex: `seu-projeto.onrender.com`).

---

## 5. Atividades Práticas Propostas
1. **Atividade 01:** Pesquisar 10 projetos no GitHub que utilizem APIs, cloná-los, analisar o framework e as APIs consumidas, e entregar um arquivo Markdown com uma tabela detalhada.
2. **Atividade 02:** 
   - Criar uma API usando Express com rota de consulta de data/hora e realizar o *deploy* no Render.
   - Desenvolver uma aplicação *frontend* em outro repositório separado para consumir essa API e exibir os dados na tela (hospedando o front na Vercel).
   - Organizar a entrega em um documento contendo prints do código, da aplicação funcionando, dos painéis do Render e Vercel, e os links dos repositórios no GitHub.

---

## 6. Referências Bibliográficas Principais
- SOUZA, Natan. *Bootstrap 4: conheça a biblioteca front-end mais utilizada no mundo.* São Paulo: Casa do Código, 2018.
- MACHADO, Kheronn Khennedy. *Angular 11 e Firebase...* São Paulo: Casa do Código, 2021.
- EIS, Diego. *Guia Front-end: o caminho das pedras para ser um dev front-end.* São Paulo: Casa do Código, 2015.