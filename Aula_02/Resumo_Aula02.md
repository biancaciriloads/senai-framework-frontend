# Resumo da Aula 02: Configuração do Ambiente de Desenvolvimento
**Instituição:** SENAI  
**Disciplina:** Frameworks Front-end  
**Professor:** Me. Deivison S. Takatu  

---

## 1. Sumário da Aula
- Introdução ao Versionamento e Versionamento Semântico (SemVer)
- Git e Controle de Versão (Tags, Branches e Boas Práticas)
- Ambiente de Desenvolvimento Integrado (IDE) - Visual Studio Code
- Node.js e NPM (Node Package Manager)
- Criação e Estrutura de Projetos React
- Deploy e Hospedagem com Vercel
- Atividades Práticas

---

## 2. Introdução ao Versionamento
O versionamento é o processo de registrar e atribuir identificadores únicos às versões de um documento ou software, garantindo rastreabilidade e auditoria completa.

### Versionamento x Backup
| Característica | Versionamento | Backup |
| :--- | :--- | :--- |
| **Histórico** | Registro de cada alteração com quem, quando e por quê. | Cópia pontual apenas do estado atual. |
| **Rastreabilidade** | Alta (autoria e rastreio detalhado). | Sem rastreio de autoria. |
| **Colaboração** | Suporta trabalho simultâneo com fusão (*merge*). | Arquivo único, sujeito a substituição e conflito. |
| **Reversão** | Granular (possível voltar para qualquer ponto). | Restauração total e limitada ao arquivo salvo. |

### O Caos Antes do Versionamento
- Arquivos duplicados e confusos (ex: `versao_final_agora_sim2.zip`).
- Conflitos destrutivos entre desenvolvedores editando os mesmos arquivos.
- Perda de código e ausência de histórico caso uma alteração corrompa o sistema.

---

## 3. Versionamento Semântico (SemVer)
Sistema padronizado para indicar alterações em softwares utilizando o formato **`MAJOR.MINOR.PATCH`** (Ex: `2.1.3`):

1. **`MAJOR` (Ápice):** Mudanças estruturais que quebram a compatibilidade com versões anteriores.
2. **`MINOR` (Incremento):** Adição de novas funcionalidades mantendo a retrocompatibilidade.
3. **`PATCH` (Correção):** Correção de bugs e ajustes menores sem alterar a interface de programação (API).

*Nota:* Versões iniciando com `0.x.x` indicam fase de desenvolvimento inicial.

### Tipos de Modificações no Código
- **Bug Fix:** Correção de erros.
- **New Feature:** Adição de nova funcionalidade.
- **Feature Enhancement:** Melhoria em funcionalidades existentes.
- **Refactoring:** Limpeza e reorganização interna do código.
- **Performance:** Otimizações de velocidade e eficiência.
- **Security Patch:** Correção de falhas de segurança.
- **Dependency Update:** Atualização de bibliotecas e frameworks.
- **Adding Tests:** Inclusão de testes automatizados.

---

## 4. Git e Controle de Versão
Criado por **Linus Torvalds**, o Git é um sistema de controle de versão distribuído executado via linha de comando e integrado a repositórios remotos (como o GitHub).

### Configuração Inicial e Comandos Úteis
- Configurar usuário e e-mail:
  ```bash
  git config --global user.name "<Nome>"
  git config --global user.email "<Email>"
  ```
- Verificar versão instalada: `git --version`

### Tags no Git
- **Leves (*Lightweight*):** Apenas um ponteiro para um commit específico.
- **Anotadas (*Annotated*):** Armazenam metadados adicionais (autor, data e mensagem).
- **Comandos:** `git tag <nome>` para criar, `git tag` para listar e `git push origin <nome>` para enviar ao repositório remoto.

### Boas Práticas com Git
- Fazer commits pequenos e frequentes.
- Escrever mensagens claras descrevendo o que mudou e o motivo.
- Utilizar branches para isolar novas funcionalidades e correções, mantendo a branch principal estável.
- Garantir testes automatizados antes de realizar o *merge*.

---

## 5. Ferramentas de Desenvolvimento: IDE, Node.js e NPM
- **Visual Studio Code (VS Code):** Editor de código leve que atua como uma IDE completa através de extensões e recursos integrados.
- **Node.js:** Ambiente de execução JavaScript voltado para o *backend* (servidor), permitindo utilizar a mesma linguagem tanto no navegador quanto no servidor.
- **NPM (*Node Package Manager*):** Gerenciador de pacotes padrão do Node.js. Utiliza o arquivo `package.json` para gerenciar dependências de forma automatizada através do comando `npm install`.

---

## 6. Criação de Projetos React
O React é uma biblioteca JavaScript para construção de interfaces. O ecossistema padrão utiliza o utilitário `npx` para inicialização:

```bash
# Passo 1: Criar o projeto
npx create-react-app meu-projeto-react

# Passo 2: Entrar na pasta do projeto
cd meu-projeto-react

# Passo 3: Abrir no VS Code
code .

# Passo 4: Iniciar o servidor local de desenvolvimento
npm start
```

### Estrutura de Pastas Padrão
- **`node_modules/`:** Contém todas as dependências e bibliotecas instaladas do projeto.
- **`public/`:** Arquivos públicos estáticos (HTML principal, ícones, manifestos).
- **`src/`:** Código-fonte principal da aplicação React (`App.js`, `index.js`, folhas de estilo).
- **Arquivos de Configuração:** `.gitignore` (oculta arquivos sensíveis do Git), `package.json` e `package-lock.json` (gerenciamento de pacotes e scripts).

---

## 7. Deploy e Hospedagem com Vercel
O **Deploy** é o processo de publicar a aplicação em um ambiente de produção para torná-la acessível aos usuários finais.

### Vantagens da Vercel
- Hospedagem simplificada focada em aplicações modernas e estáticas.
- Integração nativa com plataformas Git (GitHub, GitLab, Bitbucket) para deploys automáticos a cada *push*.
- Suporte a Serverless Functions e distribuição global via CDN para baixa latência.
- Facilidade para execução de *rollbacks* rápidos e seguros.

---

## 8. Atividades Práticas Propostas
1. **Atividade Individual:** Desenvolver uma aplicação em React utilizando o VS Code, versionar com Git, enviar para o GitHub e realizar o deploy automatizado na Vercel, obtendo uma URL pública.
2. **Atividade em Grupo:** Escolher um Framework Front-end e elaborar um relatório técnico em PDF (mínimo de 5 páginas) abordando suas características, vantagens de mercado, aplicações e um exemplo prático de uso.

---

## 9. Referências Bibliográficas Principais
- SOUZA, Natan. *Bootstrap 4: conheça a biblioteca front-end mais utilizada no mundo.* São Paulo: Casa do Código, 2018.
- MACHADO, Kheronn Khennedy. *Angular 11 e Firebase...* São Paulo: Casa do Código, 2021.
- EIS, Diego. *Guia Front-end: o caminho das pedras para ser um dev front-end.* São Paulo: Casa do Código, 2015.
- BANKS, A.; PORCELLO, E. (2017). Referências de ecossistema JavaScript moderno.