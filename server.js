const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const userRoutes = require('./routes/userRoutes');

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/projeto_login', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Conexão com o banco de dados estabelecida');
        const db = mongoose.connection;
        const collections = await db.db.listCollections().toArray();
        const collectionsNames = collections.map(collection => collection.name);
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
        console.error('Erro ao conectar ao banco de dados:', error);
    });

app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', userRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`O servidor está funcionando na porta: ${PORT}`);
});
