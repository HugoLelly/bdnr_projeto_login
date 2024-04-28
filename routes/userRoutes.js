// Importa o módulo express, que é uma estrutura de aplicativo web para Node.js.
const express = require('express');
// Cria um novo roteador do express. Este roteador pode ser usado para definir várias rotas.
const router = express.Router();
// Importa o controlador de usuário, que contém a lógica para lidar com solicitações relacionadas ao usuário.
const userController = require('../controllers/userController');

// Define uma rota GET para a raiz ('/'). Quando uma solicitação GET é feita para a raiz, a função getAllUsers do controlador de usuário é chamada.
router.get('/', userController.getAllUsers);
// Define uma rota POST para a raiz ('/'). Quando uma solicitação POST é feita para a raiz, a função createUser do controlador de usuário é chamada.
router.post('/', userController.createUser);
// Define uma rota POST para '/login'. Quando uma solicitação POST é feita para '/login', a função loginUser do controlador de usuário é chamada.
router.post('/login', userController.loginUser);
// Define uma rota GET para '/me'. Quando uma solicitação GET é feita para '/me', a função getUserProfile do controlador de usuário é chamada.
router.get('/me', userController.getUserProfile);
// Define uma rota PUT para '/me'. Quando uma solicitação PUT é feita para '/me', a função updateUserProfile do controlador de usuário é chamada.
router.put('/me', userController.updateUserProfile);
// Define uma rota DELETE para '/me'. Quando uma solicitação DELETE é feita para '/me', a função deleteUserProfile do controlador de usuário é chamada.
router.delete('/me', userController.deleteUserProfile);

// Exporta o roteador para que possa ser usado em outros módulos.
module.exports = router;

// Este código JavaScript define várias rotas para um aplicativo Express.js. As rotas estão relacionadas a operações de usuário, como obter todos os usuários, criar um usuário, fazer login de um usuário, obter o perfil de um usuário, atualizar o perfil de um usuário e deletar o perfil de um usuário. A lógica para lidar com essas solicitações é definida no controlador de usuário.
// Foi utilizado o copilot para gerar os comentarios explicando o codigo.