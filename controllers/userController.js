// Importando o modelo de usuário do diretório 'models'
const User = require('../models/User');

// Função assíncrona para obter todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
        // Busca todos os usuários no banco de dados
        const users = await User.find();
        // Retorna os usuários com status 200 (sucesso)
        res.status(200).json(users);
    } catch (error) {
        // Em caso de erro, retorna status 500 (erro interno do servidor) com a mensagem de erro
        res.status(500).json({ message: error.message });
    }
};

// Função assíncrona para criar um novo usuário
exports.createUser = async (req, res) => {
    try {
        // Extrai nome, email e senha do corpo da requisição
        const { name, email, password } = req.body;
        // Verifica se todos os campos foram preenchidos
        if (!name || !email || !password) {
            // Retorna status 400 (requisição inválida) se algum campo estiver faltando
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
        // Cria um novo usuário com os dados recebidos
        const newUser = new User({ name, email, password });
        // Salva o novo usuário no banco de dados
        await newUser.save();
        // Retorna o novo usuário com status 201 (criado)
        res.status(201).json(newUser);
    } catch (error) {
        // Em caso de erro, retorna status 500 com a mensagem de erro
        res.status(500).json({ message: error.message });
    }
};

// Função assíncrona para fazer login de um usuário
exports.loginUser = async (req, res) => {
    try {
        // Extrai email e senha do corpo da requisição
        const { email, password } = req.body;
        // Busca o usuário pelo email no banco de dados
        const user = await User.findOne({ email });
        // Se o usuário não for encontrado, retorna status 404 (não encontrado)
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        // Se a senha não corresponder, retorna status 401 (não autorizado)
        if (user.password !== password) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }
        // Se tudo estiver correto, retorna status 200 com a mensagem de sucesso e os dados do usuário
        res.status(200).json({ message: "Login bem-sucedido", user });
    } catch (error) {
        // Em caso de erro, retorna status 500 com a mensagem de erro
        res.status(500).json({ message: error.message });
    }
};

// Função assíncrona para obter o perfil de um usuário
exports.getUserProfile = async (req, res) => {
    try {
        // Retorna os dados do usuário com status 200
        res.status(200).json({ user: req.user });
    } catch (error) {
        // Em caso de erro, retorna status 500 com a mensagem de erro
        res.status(500).json({ message: error.message });
    }
};

// Função assíncrona para atualizar o perfil de um usuário
exports.updateUserProfile = async (req, res) => {
    try {
        // Extrai as chaves do corpo da requisição
        const updates = Object.keys(req.body);
        // Define as atualizações permitidas
        const allowedUpdates = ['name', 'email', 'password'];
        // Verifica se todas as atualizações estão permitidas
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        // Se alguma atualização não for permitida, retorna status 400
        if (!isValidOperation) {
            return res.status(400).json({ message: 'Atualizações inválidas.' });
        }
        // Aplica as atualizações no usuário
        updates.forEach(update => req.user[update] = req.body[update]);
        // Salva o usuário atualizado no banco de dados
        await req.user.save();
        // Retorna o usuário atualizado com status 200
        res.status(200).json(req.user);
    } catch (error) {
        // Em caso de erro, retorna status 500 com a mensagem de erro
        res.status(500).json({ message: error.message });
    }
};

// Função assíncrona para deletar o perfil de um usuário
exports.deleteUserProfile = async (req, res) => {
    try {
        // Remove o usuário do banco de dados
        await req.user.remove();
        // Retorna status 204 (sem conteúdo)
        res.status(204).end();
    } catch (error) {
        // Em caso de erro, retorna status 500 com a mensagem de erro
        res.status(500).json({ message: error.message });
    }
};

// Este código é um controlador de usuários para uma aplicação Node.js que usa o Express.js como framework e o Mongoose para interagir com o MongoDB. Ele define funções para criar, ler, atualizar e deletar usuários, além de fazer login.
// Foi utilizado o copilot para gerar os comentarios explicando o codigo.
