# Projeto BDNR (Banco de Dados Não Relacionais)

O projeto **Projeto BDNR (Banco de Dados Não Relacionais)** é uma aplicação de exemplo desenvolvida para demonstrar o uso de um banco de dados não relacional (NoSQL) em conjunto com uma aplicação web. Ele oferece funcionalidades básicas de login, registro de usuários, exibição e edição de perfil, bem como exclusão de conta.

## Informações de Identificação:

- **Instituição:** Univassouras - Campus Maricá
- **Disciplina:** Banco de Dados Não Relacionais
- **Professor:** Fabricio Dias
- **Período:** 5º Período - Turma A - 2024.1
- **Aluno e Matrícula:** Hugo Lelly de Lima Marinho - 202211182

Disponivel em https://hugolelly.github.io/bdnr_projeto_login/

## Funcionalidades:

- **Login e Registro de Usuários:** Os usuários podem se autenticar na aplicação ou registrar uma nova conta.
- **Perfil do Usuário:** Os usuários autenticados podem visualizar e editar suas informações de perfil.
- **Exclusão de Conta:** Os usuários podem excluir suas contas permanentemente.
- **Banco de Dados NoSQL:** Utiliza o MongoDB como banco de dados não relacional para armazenar informações de usuários.

## Estrutura do Projeto:

O projeto segue uma estrutura de pastas com a organização dos arquivos da seguinte forma:

- **controllers:** Contém os controladores responsáveis por gerenciar as requisições HTTP.
- **models:** Contém os modelos de dados para interagir com o banco de dados MongoDB.
- **public:** Contém os arquivos estáticos da aplicação, como HTML, CSS e JavaScript.
- **routes:** Contém as definições de rotas da API da aplicação.
- **server.js:** Arquivo principal que configura o servidor Express e define as rotas da aplicação.
- **userRoutes.js:** Arquivo com as rotas específicas para as operações relacionadas ao usuário.

## Como Executar o Projeto:

1. Clone o repositório para sua máquina local.
2. Certifique-se de ter o MongoDB instalado e em execução na sua máquina.
3. Instale as dependências do projeto executando `npm install`.
4. Inicie o servidor executando `node server.js`.
5. Acesse a aplicação em seu navegador, geralmente em `http://localhost:3000`.

## Tecnologias Utilizadas:

- **Node.js:** Plataforma para construção da aplicação backend.
- **Express:** Framework web para Node.js utilizado na construção das APIs.
- **MongoDB:** Banco de dados NoSQL utilizado para armazenar os dados dos usuários.
- **Mongoose:** ODM (Object Data Modeling) para Node.js, utilizado para modelagem de dados e interação com o MongoDB.

## Contribuindo:

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests com sugestões, correções de bugs ou melhorias.
