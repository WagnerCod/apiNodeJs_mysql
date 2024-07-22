const connection = require('./connection');

const createdImovel = async (imovelData) => {
    try {
        const sqlQuery = 'INSERT INTO imovel (id_locador, descricao, endereco_imovel, disponivel, tipo_imovel, img) VALUES (?,?,?,?,?,?) ; ';

        const result = await connection.execute(sqlQuery, [imovelData.id_locador, imovelData.descricao, imovelData.endereco_imovel, imovelData.disponivel, imovelData.tipo_imovel, imovelData.img]);
        return { id_imovel: result[0].insertId };
    } catch (error) {
        console.error('Erro ao criar imóvel:', error);
        throw error;
    }
}

const getImovelID = async (imovelData) => {
    console.log(imovelData);
    try {
        const sqlQuery = 'SELECT * FROM vw_imovel_locador WHERE id_imovel = ? ; ';
        const [result] = await connection.execute(sqlQuery, [imovelData.id])
        if (result.length > 0) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Erro ao visualizar o  imovel:', error);
        throw error;
    }
}

const getAllImovel = async () => {
    try {
        const sqlQuery = 'SELECT * FROM vw_imovel_locador';
        const result = await connection.execute(sqlQuery);
        return result[0];

    } catch (error) {
        console.error('Erro ao visualizar o  imovel:', error);
        throw error;
    }
}

const updateImovel = async (id, imovelData) =>{
    console.log(imovelData);
    try{
        const sqlQuery = 'UPDATE imovel SET id_locador = ?, descricao = ?, endereco_imovel = ?, disponivel = ?, tipo_imovel = ?, img = ? WHERE id_imovel = ? ; ';
        const result = await connection.execute(sqlQuery, [imovelData.id_locador, imovelData.descricao, imovelData.endereco_imovel, imovelData.disponivel, imovelData.tipo_imovel, imovelData.img, id]);
        return result;
    }catch (error){
        console.error('Erro ao atualizar imóvel:', error);
        throw error;
    }
}

const deleteImovel = async (id) => {
    try {
        const sqlQuery = 'DELETE FROM imovel WHERE id_imovel = ? ';
        const resultDelete = await connection.execute(sqlQuery, [id]);
        return resultDelete;
    } catch (error) {
        console.error('Erro ao deletar imovel:', error);
        throw error;
    }
}

module.exports = {
    createdImovel,
    deleteImovel,
    getImovelID,
    getAllImovel,
    updateImovel
}
