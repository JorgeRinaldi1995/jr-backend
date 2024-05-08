const express = require("express");
const router = express.Router();
const {loginAuth, LoginPage, Profile, Register} = require('../controllers/users.controller.js');

router.get('/', LoginPage)

router.get('/register', (req, res) => {
    res.render('cadastro', { title: 'Cadastre-se' });
});

router.post('/register', Register)

router.post('/auth', loginAuth)

router.get('/profile', Profile)

module.exports = router;