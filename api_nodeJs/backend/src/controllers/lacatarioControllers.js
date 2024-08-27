const response  = require('express');
const locatarioModel = require('../models/locatarioModel');

const insertLocatario = async (req, res) => {
    try {
        // Desestruturação correta do body para obter locadorData
        const { nome, cpf, dt_nascimento, endereco, cnpj, estado_civil, telefone, email, dependentes} = req.body;

        // Cria um objeto locadorData com os dados recebidos
        const locatarioData = { nome, cpf, dt_nascimento, endereco, cnpj, estado_civil, telefone, email, dependentes };

        // Chama o método insertLocatario do modelo e aguarda a inserção no banco de dados
        const createLocatario = await locatarioModel.insertLocatario(locatarioData);

        // Retorna uma resposta de sucesso com o locador inserido e uma mensagem
        return res.status(201).json({ locatario: createLocatario, message: 'Sucesso ao inserir' });
    } catch (error) {
        // Trata qualquer erro ocorrido durante o processo
        console.error('Erro ao inserir locatario:', error);
        return res.status(500).json({ error: 'Erro ao inserir locatario' });
    }
}

const updatelocatario = async (req, res) => {
    try {
        let id = Number(req.params.id);
        const { nome, cpf, cnpj, dt_nascimento, endereco, estado_civil, telefone, email, dependentes } = req.body;

        const locatarioData = {
            nome: nome,
            cpf: cpf,
            cnpj: cnpj,
            dt_nascimento: dt_nascimento,
            endereco: endereco ,
            estado_civil: estado_civil ,
            telefone: telefone ,
            email: email ,
            dependentes: dependentes 
        };

        const updatelocatario = await locatarioModel.updateLocatario(id, locatarioData);
        return res.status(200).json({ message: 'Locatario atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar locatario:', error);
        return res.status(500).json({ error: 'Erro ao atualizar locatario' });
    }
}
const deletarContalocatario = async (req, res) => {
    try {
        let id = Number(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const deletarConta = await locatarioModel.deletarContaLocatario(id);
        if (deletarConta) {
            console.log('Registro deletado com sucesso: ' + id);
            return res.status(200).json({ message: 'Conta deletada com sucesso, não há chances de recuperar!' });
        } else {
            return res.status(404).json({ message: 'Conta não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao deletar conta:', error);
        return res.status(500).json({ error: 'Erro ao deletar conta' });
    }
}

const getLocatarioAll = async (req, res) =>{
    try{
        const getlocatario = await locatarioModel.getLocatarioAll();
        return res.status(200).json(getlocatario);
    }catch(error){
        console.error('Erro ao buscar locatario:', error);
        return res.status(500).json({ error: 'Erro ao buscar locatario' });
    }
}

module.exports = {
    insertLocatario,
    updatelocatario,
    deletarContalocatario,
    getLocatarioAll
};