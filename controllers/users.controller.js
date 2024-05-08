const bcrypt = require('bcrypt');
const User = require("../models/users.model");
const session = require('express-session');

const LoginPage = async (req, res) => {
    res.render('login', { title: 'Faça o seu login' });
};

const Register = async (req, res) => {
    
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save(); // Salva o novo usuário no banco de dados
        res.status(201).json(newUser); // Retorna o usuário criado como resposta
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
   
};

const loginAuth = async (req, res) => {
    const { username, password } = req.body;

    // Procurando o usuário no banco de dados
    const user = await User.findOne({ username });

    if (!user) {
        return res.send('Usuário não encontrado.');
    }

    // Verificando a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
        console.log(passwordMatch);

        return res.send('Senha incorreta.');
    }

    // Salvando o usuário na sessão
    req.session.user = user;
    try{
        res.status(200).json({ message: "asdfasdf" });
    } catch(error){
        res.status(500).json({ message: error.message });
    }
    res.send('Login bem-sucedido.');
};

// Rota protegida - exemplo de como acessar informações do usuário autenticado
const Profile = async (req, res) => {
    if (!req.session.user) {
        res.status(200).json({ message: "Usuario ja autenticado" });
    }

    res.send(`Bem-vindo, ${req.session.user.username}!`);
};

module.exports = {
    loginAuth,
    LoginPage,
    Profile,
    Register
};