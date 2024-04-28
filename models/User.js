// Importando o módulo mongoose, que é uma biblioteca do Node.js para modelagem de objetos MongoDB
const mongoose = require('mongoose');

// Definindo o esquema do usuário. Um esquema representa a estrutura de um documento MongoDB
const userSchema = new mongoose.Schema({
    // O campo 'name' é do tipo String
    name: String,
    // O campo 'email' é do tipo String e deve ser único no banco de dados
    email: { type: String, unique: true },
    // O campo 'password' é do tipo String
    password: String,
});

// Exportando o modelo de usuário. Um modelo é uma classe com a qual construímos documentos. 
// Nesse caso, estamos criando um modelo de usuário com o esquema definido acima.
// "User" é o nome do modelo e 'userSchema' é o esquema associado a esse modelo.
module.exports = mongoose.model("User", userSchema);

// Este código define um modelo de usuário para uma aplicação Node.js que usa o Mongoose para interagir com o MongoDB. Ele define a estrutura dos documentos de usuário que serão armazenados no banco de dados.
// Foi utilizado o copilot para gerar os comentarios explicando o codigo.
