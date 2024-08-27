const connection = require('./connection');

const createdContrato = async (contratoData) => {
    console.log(contratoData);
    try {
        const sqlQuery = 'INSERT INTO contrato (id_locatario, id_imovel, dt_contrato_inicio, dt_termino_contrato, termo_condicoes, vl_mensal) values (?,?,?,?,?,?) '
        const result = await connection.execute(sqlQuery, [contratoData.id_locatario, contratoData.id_imovel, contratoData.dt_contrato_inicio, contratoData.dt_termino_contrato, contratoData.termo_condicoes, contratoData.vl_mensal]);
        return { id_contrato: result[0].insertId };
    } catch (error) {
        console.error('Erro ao criar contrato:', error);
        throw error;
    }
}

const getContrato = async ({ cpf_locatario, id_imovel }) => {
    try {
        let sqlQuery = 'SELECT * FROM vw_contrato_final WHERE 1=1';  // "1=1" garante que sempre haja uma condição inicial
        
        const params = {};

        if (id_imovel) {
            sqlQuery += ' AND id_imovel = :id_imovel';
            params.id_imovel = id_imovel;
        }
        if (cpf_locatario) {
            sqlQuery += ' AND cpf_locatario = :cpf_locatario';
            params.cpf_locatario = cpf_locatario;
        }

        const [rows] = await connection.execute(sqlQuery, params);
        return rows;

    } catch (error) {
        console.error('Erro ao consultar contrato:', error);
        throw error;
    }
};



const deleteContrato = async (id) => {
    try {
        const sqlQuery = 'DELETE FROM contrato WHERE id_contrato = ?'
        const result = await connection.execute(sqlQuery, [id]);
        if (result.length > 0) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Erro ao deletar contrato:', error);
        throw error;
    }
}

module.exports = {
    createdContrato,
    getContrato,
    deleteContrato
}