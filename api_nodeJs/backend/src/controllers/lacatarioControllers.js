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

const updatelocatarioPorCPF = async (req, res) => {
    try {
        let { cpf } = req.params;
        const { nome, dt_nascimento, endereco, estado_civil, telefone, email, dependentes } = req.body;
        const updatelocatario = await locatarioModel.updateLocatarioPorCPF(cpf, {nome, dt_nascimento, endereco, estado_civil, telefone, email, dependentes });
        return res.status(200).json({ message: 'locatario atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao inserir locatario:', error);
        return res.status(500).json({ error: 'Erro ao inserir locatario' });
    }
}
const updatelocatarioPorCnpj = async (req, res) => {
    try {
        let { cnpj } = req.params;
        const { nome, dt_nascimento, endereco, estado_civil, telefone, email, dependentes } = req.body;
        const updatelocatario = await locatarioModel.updateLocatarioPorCnpj(cnpj, { nome, dt_nascimento, endereco, estado_civil, telefone, email, dependentes });
        return res.status(200).json({ message: 'locatario atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar contar:', error);
        return res.status(500).json({ error: 'Erro ao inserir locatario' });
    }
}

const deletarContalocatario = async (req, res) =>{
    try{
        let  {cpf} = req.params;
        console.log("cpf ", cpf)
        const deletarConta = await  locatarioModel.deletarContaLocatario({cpf});
        if(deletarConta){
            console.log('Registro deletado com sucesso: ' + cpf)
            return res.status(200).json({message: 'Conta deletada com sucesso, não há chances de recuperar! '})
        }
    }catch(error){
        console.error('Erro ao deletar conta:', error);
        return res.status(500).json({ error: 'Erro ao deletar conta' });
    }
}

const getlocatarioPorCpf = async (req, res) =>{
    try{
        let  { cpf }= req.params;
        const getlocatario = await locatarioModel.getLocatarioPorCpf({cpf});
        return res.status(200).json(getlocatario);
    }catch(error){
        console.error('Erro ao buscar locatario:', error);
        return res.status(500).json({ error: 'Erro ao buscar locatario' });
    }
}

const getlocatarioPorCnpj = async (req, res) =>{
    try{
        let  { cnpj }= req.params;
        const getlocatario = await locatarioModel.getLocatarioPorCnpj(cnpj);
        return res.status(200).json(getlocatario);
    }catch(error){
        console.error('Erro ao buscar locatario:', error);
        return res.status(500).json({ error: 'Erro ao buscar locatario' });
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
    updatelocatarioPorCPF,
    updatelocatarioPorCnpj,
    deletarContalocatario,
    getlocatarioPorCpf,
    getlocatarioPorCnpj,
    getLocatarioAll
};