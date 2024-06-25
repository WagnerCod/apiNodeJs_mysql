const response = require("express");
const contratoModel = require('../models/contratoModel');

const createdContrato = async (req, res) => {
    try {
        const { id_locatario, id_usuario, id_imovel, dt_contrato_inicio, dt_termino_contrato, termo_condicoes, vl_mensal } = req.body;
        const contratoData = { id_locatario, id_usuario, id_imovel, dt_contrato_inicio, dt_termino_contrato, termo_condicoes, vl_mensal };
        const contratoOk = await contratoModel.createdContrato(contratoData);
        if (contratoOk) {
            return res.status(200).json({ contratoID: contratoOk, message: 'Contrato criado com sucesso!' });
        } else {
            return res.status(400).json({ message: 'Erro ao criar o contrato' });
        }
    } catch (error) {
        console.error('Erro ao criar Contrato:', error);
        return res.status(500).json({ error: error.message });
    }
}

const getContratoID = async (req, res) => {
    try {
        const { cpf_locatario, cnpj_locatario, cpf_locador, cnpj_locador } = req.params;
        const contratoData = {
            cpf_locatario: cpf_locatario   || 0,
            cnpj_locatario: cnpj_locatario || 0,
            cpf_locador: cpf_locador       || 0,
            cnpj_locador: cnpj_locador     || 0
        };

        const contratoOK = await contratoModel.getContratoID(contratoData);

        if (contratoOK.length > 0) {
            return res.status(200).json(contratoOK);
        } else {
            return res.status(404).json({ message: 'Contrato não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao consultar contrato:', error);
        return res.status(500).json({ error: 'Erro ao consultar contrato' });
    }
};

const deleteContrato = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await contratoModel.deleteContrato(id);
        if (result) {
            return res.status(200).json({ message: 'Contrato deletado com sucesso!' });
        } else {
            return res.status(400).json({ message: 'Erro ao deletar o contrato, verifique o identificador' });
        }
    } catch (error) {
        console.error('Erro ao deletar contrato:', error);
        res.status(500).json({ error: 'Erro ao deletar contrato' });
    }
}

module.exports = {
    createdContrato,
    getContratoID,
    deleteContrato
}