const pagamentoModel = require('../models/pagamentoModel');

const createdPagmamento = async (req, res) => {
    try {
        const { id_contrato, taxa_juros, dt_pagamento, vl_pago, tipo_pagamento, status_pagamento } = req.body;

        const pagamentoData = { id_contrato, taxa_juros, dt_pagamento, vl_pago, tipo_pagamento, status_pagamento };

        const pagamentoOk = await pagamentoModel.createdPagmamento(pagamentoData);
        return res.status(201).json({
            pagamento: pagamentoOk, message: 'Sucesso ao inserir'
        });
    } catch (error) {
        console.error('Erro ao inserir pagamento:', error);
        return res.status(500).json({ error: 'Erro ao inserir pagamento' });
    }
}

const getPagamento = async (req, res) => {
    try {
        const id_contrato = Number(req.params.id);
        const pagamentoOk = await pagamentoModel.getPagamento(id_contrato);
        return res.status(200).json(pagamentoOk);
     } catch (error) { 
        console.error('Erro ao buscar locador:', error);
        return res.status(500).json({ error: 'Erro ao buscar pagamento' });
    }
}

const deletePagamento = async (req, res) => {
    try {
        const id_contrato = Number(req.params.id);

        const deleteOk = await pagamentoModel.deletePagamento(id_contrato);
        if (deleteOk) {
            res.status(200).json({ message: 'deletado' });
        } else {
            res.status(401).json({ error: 'verfique o id do pagamento' });
        }
    } catch (error) {
        console.error('Erro ao deletar pagamento:', error);
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createdPagmamento,
    getPagamento,
    deletePagamento
}