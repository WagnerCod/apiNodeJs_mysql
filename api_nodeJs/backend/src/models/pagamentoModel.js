const connection = require('./connection');

const createdPagmamento = async (pagamentoData) => {
    console.log(pagamentoData);
    try {
        const sqlQuery = 'INSERT INTO pagamento (id_contrato, taxa_juros, dt_pagamento, vl_pago, tipo_pagamento, status_pagamento) VALUES (?,?,?,?,?,?) ; ';
        const result = await connection.execute(sqlQuery, [pagamentoData.id_contrato, pagamentoData.taxa_juros, pagamentoData.dt_pagamento, pagamentoData.vl_pago, pagamentoData.tipo_pagamento, pagamentoData.status_pagamento]);
        return { id_pagamento: result[0].insertId };
    } catch (error) {
        console.error('Erro ao inserir Pagamento:', error);
        throw error;
    }
}

const getPagamento = async (id_contrato) => {
    try {
        console.log(id_contrato);
        const sqlQuery = 'SELECT * FROM pagamento WHERE id_contrato = ? ; ';
        const [result] = await connection.execute(sqlQuery, [id_contrato]);
        if (result.length > 0) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Erro ao visualizar o  pagamento:', error);
        throw error;
    }
}

const deletePagamento = async (id_contrato) => {
    try {
        const sqlQuery = 'DELETE FROM pagamento WHERE id_contrato = ? ';
        const resultDelete = await connection.execute(sqlQuery, [id_contrato]);
        return resultDelete;
    } catch (error) {
        console.error('Erro ao deletar imovel:', error);
        throw error;
    }
}

module.exports = {
    createdPagmamento,
    getPagamento,
    deletePagamento
}