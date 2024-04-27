const response = require("express");
const usuarioModel = require('../models/usuarioModel');


const createdUser = async (req, res) => {
    try {
        const { tipo_usuario, email, senha, ativo } = req.body;
        const userData = { tipo_usuario, email, senha, ativo }
        const userOk = await usuarioModel.createdUser(userData);
        return res.status(200).json({ locadorId: userOk, message: 'Login criado com sucesso!' });

    } catch (error) {
        console.error('Erro  locatario:', error);
        return res.status(500).json({ error: 'Erro ao inserir locatario' });
    }
}

const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const getUser = await usuarioModel.getUsuario({ id });
        return res.status(200).json(getUser);
    } catch {
        console.error('Erro ao encontrar usuário:', error);
        return res.status(500).json({ error: 'Erro ao encontrar usuário' });
    }
}

const validateUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const loginData = {email, password}
        const userLogin = await usuarioModel.validateUser(loginData);
        if (userLogin) {
            res.status(200).json({ usuario: userLogin, message: 'ok' });
        } else {
            res.status(401).json({ error: 'Usuário ou senha incorreta' });
        }
    } catch {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
}


module.exports = {
    createdUser,
    getUsuario,
    validateUser
}