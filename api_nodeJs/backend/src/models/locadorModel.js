const connection = require('./connection');

const insertLocador = async (locadorData) => {
    console.log(locadorData);
    try {
        // Prepara a query SQL para inserção
        let sqlQuery = 'INSERT INTO locador(nome_locador, cpf_locador, cnpj_locador, email_locador, telefone_locador, dt_nascimento, endereco_locador) VALUES (?, ?, ?, ?, ?, ?, ?)';

        // Executa a query com os valores fornecidos
        const result = await connection.execute(sqlQuery, [locadorData.nome, locadorData.cpf, locadorData.cnpj, locadorData.email, locadorData.telefone, locadorData.dt_nascimento, locadorData.endereco]);

        // Retorna o ID do locador inserido
        return { insertId: result[0].insertId };
    } catch (error) {
        // Trata qualquer erro ocorrido durante a execução da query
        console.error('Erro ao inserir locador:', error);
        throw error;
    }
}

const updateLocador= async (id, locadorData) =>{
    console.log(locadorData);
    try{
        const sqlQuery = 'update locador set nome_locador = ? , cpf_locador = ?, email_locador = ?, telefone_locador = ?, dt_nascimento = ?,  endereco_locador = ? where id_locador = ?';
        const updatelocador = await connection.execute(sqlQuery,[locadorData.nome, locadorData.cpf, locadorData.email, locadorData.telefone, locadorData.dt_nascimento, locadorData.endereco, id])
        return updatelocador;

    }catch (error){
        console.error('Erro ao inserir locador:', error);
        throw error;
    }
}

const deletarContaLocador = async (res) => {
    try{
        const  {cpf} = res;
        const sqlQuery = 'DELETE FROM locador WHERE cpf_locador = ?';
        const deletarConta =  await connection.execute(sqlQuery, [cpf]);
        return deletarConta;
    }catch (error){
        console.error('Erro ao deletar conta:', error);
        throw error;
    }
}

const getLocadorPorCpf =  async (res) =>{
    console.log(res);
    try{
        const {cpf} = res;
        const sqlQuery = 'SELECT * FROM locador WHERE cpf_locador =?';
        const result  = await connection.query(sqlQuery, [cpf]);
        return result[0];
     } catch(error){
        console.error('Erro ao consultar locador:', error);
        throw error;
     }
}

const getLocadorPorCnpj =  async (res) =>{
    try{
        const {cnpj} = res;
        const sqlQuery = 'SELECT * FROM locador WHERE cnpj_locador=?';
        const result  = await connection.query(sqlQuery, [cnpj]) ;
        return(result[0]);
     } catch(error){
        console.error('Erro ao consultar locador:', error);
        throw error;
     }
}

const getAllLocador = async (res) => {
    try{
        const sqlQuery = 'SELECT * FROM locador ORDER BY nome_locador';
        const result = await connection.query(sqlQuery);
        return result[0]
    }catch(error){
        console.error('Erro ao consultar locador:', error);
        throw error;
    }
}

module.exports = {
    insertLocador,
    updateLocador,
    deletarContaLocador,
    getLocadorPorCpf,
    getLocadorPorCnpj,
    getAllLocador
};