const response = require("express");
const usuarioModel = require('../models/usuarioModel');


const createdUser = async (req, res) => {
    try {
        const { tipo_usuario, email, senha, ativo } = req.body;
        const userData = { tipo_usuario, email, senha, ativo }
        const userOk = await usuarioModel.createdUser(userData);
        return res.status(200).json({ LoginID: userOk, message: 'Login criado com sucesso!' });

    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ error: error.message });
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
            res.status(401).json({ error: 'Verifique se os campos estão corretos' });
        }
    } catch (error){
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
}

const updateLogin = async(req, res) =>{
    const id = Number(req.params.id);
    const { email, senha, ativo } = req.body;

    try {
        const loginData = { email, senha, ativo };
        const updateLogin = await usuarioModel.updateLogin(id, loginData);

        if(updateLogin){
            res.status(200).json({message: 'ok'});
        }else{
            res.status(401).json({ error: 'verfique se os dados estão corretos' });
        }

    }catch{
    console.error('Erro ao atualizar dados:', error);
        res.status(500).json({ error: 'Erro ao atualizar dados' });
    }
}

const deleteAccount = async(req, res) =>{
    try{
        const id = req.params.id; // Remove as chaves desnecessárias na desestruturação
        if(deleteAcc){
            const deleteAcc = await usuarioModel.deleteAccount(id);
            res.status(200).json({message: 'deletado'});
        }else{
            res.status(401).json({ error: 'verfique o id da conta' });
        }
    }catch{
        console.error('Erro ao deletar conta:', error);
        res.status(500).json({ error: 'Erro ao deletar conta' });
    }
}

const getAllAccount = async (_req, res) => {
    try{
        const getAll = await usuarioModel.getAllAccount();
        if(getAll && getAll.length > 0){
            res.status(200).json(getAll);
        }else{
            res.status(404).json('Não existe nenhuma conta cadastrada')
        }
    }catch{
        console.error('Erro ao consultar contas:', error);
        res.status(500).json({ error: 'Erro ao consultar contas' })
    }
}


module.exports = {
    createdUser,
    getUsuario,
    validateUser,
    updateLogin,
    deleteAccount,
    getAllAccount
}