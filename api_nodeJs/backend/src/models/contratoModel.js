const connection = require('./connection');

const createdContrato = async (contratoData) => {
    console.log(contratoData);
    try {
        const sqlQuery = 'INSERT INTO contrato (id_locatario, id_usuario, id_imovel, dt_contrato_inicio, dt_termino_contrato, termo_condicoes, vl_mensal) values (?,?,?,?,?,?,?) ; '
        const result = await connection.execute(sqlQuery, [contratoData.id_locatario, contratoData.id_usuario, contratoData.id_imovel, contratoData.dt_contrato_inicio, contratoData.dt_termino_contrato, contratoData.termo_condicoes, contratoData.vl_mensal]);
        return { id_contrato: result[0].insertId };
    } catch (error) {
        console.error('Erro ao criar contrato:', error);
        throw error;
    }
}

const getContratoID = async (contratoData) => {
    console.log(contratoData);
    try {
        const sqlQuery = " SELECT * FROM vw_contrato_final  where   locatario.cpf_locatario = ? OR locatario.cnpj_locatario = ? OR locador.cpf_locador = ? OR locador.cnpj_locador = '0' ORDER BY contrato.dt_contrato_inicio";
        const [rows] = await connection.execute(sqlQuery, [contratoData.cpf_locatario,
        contratoData.cnpj_locatario,
        contratoData.cpf_locador,
        contratoData.cnpj_locador]);
        return rows;
    } catch (error) {
        console.error('Erro ao consultar contrato:', error);
        throw error;
    }
}
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
    getContratoID,
    deleteContrato
}