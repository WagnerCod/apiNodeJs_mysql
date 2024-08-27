const response = require("express");
const contratoModel = require('../models/contratoModel');

const createdContrato = async (req, res) => {
    try {
        const { id_locatario, id_imovel, dt_contrato_inicio, dt_termino_contrato, termo_condicoes, vl_mensal } = req.body;
        const contratoData = { id_locatario, id_imovel, dt_contrato_inicio, dt_termino_contrato, termo_condicoes, vl_mensal };
        const contratoOk = await contratoModel.createdContrato(contratoData);
        if (contratoOk) {
            return res.status(201).json({ contratoID: contratoOk.id_contrato, message: 'Contrato criado com sucesso!' });
        } else {
            return res.status(400).json({
                errorCode: 'CONTRATO_CREATION_FAILED',
                message: 'Erro ao criar o contrato',
                details: 'O contrato não pôde ser criado devido a um problema desconhecido.'
            });
        }
    } catch (error) {
        console.error('Erro ao criar Contrato:', error);

        let statusCode = 500;
        let errorCode = 'INTERNAL_SERVER_ERROR';
        let message = 'Ocorreu um erro interno ao processar a solicitação.';

        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            statusCode = 400;
            errorCode = 'FOREIGN_KEY_CONSTRAINT_FAILED';
            message = 'Não foi possível criar o contrato devido a uma violação de chave estrangeira. Verifique se o id_locatario e id_imovel existem.';
        }

        return res.status(statusCode).json({
            errorCode: errorCode,
            message: message,
            details: error.message
        });
    }
};



const getContrato = async (req, res) => {
    try {
        const { cpf } = req.params || {};  
        const { id_imovel } = req.query || {}; 

        console.log('CPF:', cpf);
        console.log('ID Imóvel:', id_imovel);
        
      
        const contratoOK = await contratoModel.getContrato({ cpf_locatario: cpf, id_imovel });

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
    getContrato,
    deleteContrato
}