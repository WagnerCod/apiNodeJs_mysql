const { response } = require('express');
const locadorModel = require('../models/locadorModel');

const insertLocador = async (req, res) => {
    try {
        // Desestruturação correta do body para obter locadorData
        const { nome, cpf, cnpj, telefone, dt_nascimento, email, senha, endereco } = req.body;

        // Cria um objeto locadorData com os dados recebidos
        const locadorData = { nome, cpf, cnpj, telefone, dt_nascimento, email, senha, endereco };

        // Chama o método insertLocador do modelo e aguarda a inserção no banco de dados
        const createLocador = await locadorModel.insertLocador(locadorData);

        // Retorna uma resposta de sucesso com o locador inserido e uma mensagem
        return res.status(201).json({ locador: createLocador, message: 'Sucesso ao inserir' });
    } catch (error) {
        // Trata qualquer erro ocorrido durante o processo
        console.error('Erro ao inserir locador:', error);
        return res.status(500).json({ error: 'Erro ao inserir locador' });
    }
}

const updateLocadorPorCPF = async (req, res) => {
    try {
        let { cpf } = req.params;
        const { nome, telefone, dt_nascimento, email, senha, endereco } = req.body;
        const updatelocador = await locadorModel.updateLocadorPorCPF(cpf, { nome, telefone, dt_nascimento, email, senha, endereco });
        return res.status(200).json({ message: 'Locador atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao inserir locador:', error);
        return res.status(500).json({ error: 'Erro ao inserir locador' });
    }
}
const updateLocadorPorCnpj = async (req, res) => {
    try {
        let { cnpj } = req.params;
        const { nome, telefone, dt_nascimento, email, senha, endereco } = req.body;
        const updatelocador = await locadorModel.updateLocadorPorCnpj(cnpj, { nome, telefone, dt_nascimento, email, senha, endereco });
        return res.status(200).json({ message: 'Locador atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar contar:', error);
        return res.status(500).json({ error: 'Erro ao inserir locador' });
    }
}

const deletarContaLocador = async (req, res) =>{
    try{
        let  {cpf}= req.params;
        await  locadorModel.deletarConta({cpf});
        return res.status(200).json({message: 'Conta deletada com sucesso, não há chances de recuperar! '})
    }catch(error){
        console.error('Erro ao deletar conta:', error);
        return res.status(500).json({ error: 'Erro ao deletar contar' });
    }
}

const getLocadorPorCpf = async (req, res) =>{
    try{
        let  { cpf }= req.params;
        const getlocador = await locadorModel.getLocadorPorCpf({cpf});
        return res.status(200).json(getlocador);
    }catch(error){
        console.error('Erro ao buscar locador:', error);
        return res.status(500).json({ error: 'Erro ao buscar contar' });
    }
}

const getLocadorPorCnpj = async (req, res) =>{
    try{
        let  { cnpj }= req.params;
        const getlocador = await locadorModel.getLocadorPorCnpj(cnpj);
        return res.status(200).json(getlocador);
    }catch(error){
        console.error('Erro ao buscar locador:', error);
        return res.status(500).json({ error: 'Erro ao buscar contar' });
    }
}

module.exports = {
    insertLocador,
    updateLocadorPorCPF,
    updateLocadorPorCnpj,
    deletarContaLocador,
    getLocadorPorCpf,
    getLocadorPorCnpj
};