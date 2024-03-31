const connection = require('./connection');

const insertLocador = async (locadorData) => {
    let { nome, cpf, cnpj, telefone, dt_nascimento, email, senha, endereco } = locadorData;
    try {
        // Prepara a query SQL para inserção
        let sqlQuery = 'INSERT INTO locador(nome, cpf, cnpj, telefone, dt_nascimento, email, senha, endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

        // Executa a query com os valores fornecidos
        const result = await connection.execute(sqlQuery, [nome, cpf, cnpj, telefone, dt_nascimento, email, senha, endereco]);

        // Retorna o ID do locador inserido
        return { insertId: result[0].insertId };
    } catch (error) {
        // Trata qualquer erro ocorrido durante a execução da query
        console.error('Erro ao inserir locador:', error);
        throw error;
    }
}

const updateLocadorPorCPF = async (cpf, locadorData) =>{
    let { nome, telefone, dt_nascimento, email, senha, endereco } = locadorData;
    try{
        const sqlQuery = 'update locador set nome = ? , telefone = ?, dt_nascimento = ?, email = ?, senha = ?, endereco = ? where cpf = ?';
        const updatelocador = await connection.execute(sqlQuery,[nome, telefone, dt_nascimento, email, senha, endereco, cpf])
        return updateLocadorPorCPF;

    }catch (error){
        console.error('Erro ao inserir locador:', error);
        throw error;
    }
}

const updateLocadorPorCnpj = async (cnpj, locadorData) =>{
    let { nome, telefone, dt_nascimento, email, senha, endereco } = locadorData;
    try{
        const sqlQuery = 'update locador set nome = ? , telefone = ?, dt_nascimento = ?, email = ?, senha = ?, endereco = ? where cnpj = ?';
        const updatelocador = await connection.execute(sqlQuery,[nome, telefone, dt_nascimento, email, senha, endereco, cnpj])
        return updateLocadorPorCPF;

    }catch (error){
        console.error('Erro ao inserir locador:', error);
        throw error;
    }
}

const deletarContaLocador = async (cpf) => {
    try{
        const sqlQuery = 'DELETE FROM locador WHERE cpf = ?';
        const deletarConta =  await connection.execute(sqlQuery, [cpf]);
        return deletarConta;
    }catch (error){
        console.error('Erro ao deletar conta:', error);
        throw error;
    }
}

const getLocadorPorCpf =  async (res) =>{
    try{
        const {cpf} = res;
        const sqlQuery = 'SELECT * FROM locador WHERE cpf =?';
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
        const sqlQuery = 'SELECT * FROM locador WHERE cnpj=?';
        const result  = await connection.query(sqlQuery, [cnpj]) ;
        return(result[0]);
     } catch(error){
        console.error('Erro ao consultar locador:', error);
        throw error;
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