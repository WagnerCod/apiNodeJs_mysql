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

const getContratoCPFLocatario = async (res) => {
    console.log(res);
    try {
        const cpf_locatario = res
        console.log(cpf_locatario);
        const sqlQuery = " SELECT * FROM vw_contrato_final where cpf_locatario = ? ORDER BY inicio_contrato";
        const [rows] = await connection.execute(sqlQuery, [cpf_locatario.cpf]);
        return rows;
    } catch (error) {
        console.error('Erro ao consultar contrato:', error);
        throw error;
    }
}
const getContratoCNPJLocatario = async (res) => {
    console.log(res);
    try {
        const cnpj_locatario = res
        console.log(cnpj_locatario);
        const sqlQuery = " SELECT * FROM vw_contrato_final where cnpj_locatario = ? ORDER BY inicio_contrato";
        const [rows] = await connection.execute(sqlQuery, [cnpj_locatario.cnpj]);
        return rows;
    } catch (error) {
        console.error('Erro ao consultar contrato:', error);
        throw error;
    }
}
const getContratoCNPJLocador = async (res) => {
    console.log(res);
    try {
        const cnpj_locador = res
        console.log(cnpj_locador);
        const sqlQuery = " SELECT * FROM vw_contrato_final where cnpj_locador = ? ORDER BY inicio_contrato";
        const [rows] = await connection.execute(sqlQuery, [cnpj_locador.cnpj]);
        return rows;
    } catch (error) {
        console.error('Erro ao consultar contrato:', error);
        throw error;
    }
}
const getContratoCPFLocador = async (res) => {
    console.log(res);
    try {
        const cpf_locador = res
        console.log(cpf_locador);
        const sqlQuery = " SELECT * FROM vw_contrato_final where cpf_locador = ? ORDER BY inicio_contrato";
        const [rows] = await connection.execute(sqlQuery, [cpf_locador.cpf]);
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
    getContratoCPFLocatario,
    getContratoCNPJLocatario,
    getContratoCNPJLocador,
    getContratoCPFLocador,
    deleteContrato
}