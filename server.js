// Importa o módulo express, que é uma estrutura de aplicativo web para Node.js.
const express = require('express');
// Importa o módulo path, que fornece utilitários para trabalhar com caminhos de arquivo e diretório.
const path = require('path');
// Importa o módulo mongoose, que fornece uma solução direta e baseada em esquemas para modelar os dados do aplicativo.
const mongoose = require('mongoose');

// Cria uma nova instância do aplicativo express.
const app = express();
// Importa as rotas do usuário, que definem como o aplicativo deve responder a solicitações HTTP específicas.
const userRoutes = require('./routes/userRoutes');

// Define a porta em que o servidor deve ouvir as solicitações.
const PORT = 3000;

// Conecta-se ao banco de dados MongoDB usando mongoose.
mongoose.connect('mongodb://localhost:27017/projeto_login', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        // Se a conexão for bem-sucedida, imprime uma mensagem no console.
        console.log('Conexão com o banco de dados estabelecida');
        // Obtém a conexão com o banco de dados.
        const db = mongoose.connection;
        // Obtém todas as coleções do banco de dados.
        const collections = await db.db.listCollections().toArray();
        // Obtém os nomes de todas as coleções.
        const collectionsNames = collections.map(collection => collection.name);
        // Se a coleção 'users' não existir, cria um novo usuário de exemplo.
        if (!collectionsNames.includes('users')) {
            console.log('Banco de dados não encontrado. Criando banco de dados...');
            const User = require('./models/User');
            const exampleUser = new User({
                name: 'adm',
                email: 'adm@adm.com',
                password: 'adm123'
            });
            try {
                await exampleUser.save();
                console.log('Usuário de exemplo criado com sucesso.');
            } catch (error) {
                console.error('Erro ao criar usuário de exemplo:', error);
            }
        }
    })
    .catch((error) => {
        // Se a conexão falhar, imprime uma mensagem de erro no console.
        console.error('Erro ao conectar ao banco de dados:', error);
    });

// Usa o middleware express.json para analisar corpos de solicitação JSON.
app.use(express.json());
// Define uma rota GET para a raiz ('/') que envia o arquivo index.html como resposta.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Usa o middleware express.static para servir arquivos estáticos da pasta 'public'.
app.use(express.static(path.join(__dirname, 'public')));
// Usa as rotas do usuário para todas as solicitações que começam com '/users'.
app.use('/users', userRoutes);
// Usa um middleware de tratamento de erros que envia uma resposta com status 500 e uma mensagem de erro.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Inicia o servidor para ouvir solicitações na porta especificada.
app.listen(PORT, () => {
    console.log(`O servidor está funcionando na porta: ${PORT}`);
});

// Este código JavaScript define um servidor Express.js que se conecta a um banco de dados MongoDB, serve arquivos estáticos da pasta 'public', define uma rota GET para a raiz ('/') e usa as rotas do usuário para todas as solicitações que começam com '/users'. Além disso, ele define um middleware de tratamento de erros que envia uma resposta com status 500 e uma mensagem de erro quando ocorre um erro. O servidor é iniciado na porta especificada.
// Foi utilizado o copilot para gerar os comentarios explicando o codigo.