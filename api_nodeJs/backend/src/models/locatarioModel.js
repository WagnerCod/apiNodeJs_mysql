const connection = require('./connection');

const insertLocatario = async (locadorData) => {
    let { nome, cpf, cnpj, telefone, dt_nascimento, endereco, email, senha } = locadorData;
    try {
        // Prepara a query SQL para inserção
        let sqlQuery = 'INSERT INTO locatario(nome, cpf, cnpj, telefone, dt_nascimento, endereco, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

        // Executa a query com os valores fornecidos
        const result = await connection.execute(sqlQuery, [nome, cpf, cnpj, telefone, dt_nascimento, endereco, email, senha]);

        // Retorna o ID do locador inserido
        return { insertId: result[0].insertId };
    } catch (error) {
        // Trata qualquer erro ocorrido durante a execução da query
        console.error('Erro ao inserir locador:', error);
        throw error;
    }
}

const updateLocatarioPorCPF = async (cpf, locatarioData) => {
    let { nome, telefone, dt_nascimento, endereco, email, senha } = locatarioData;
    try {
        const sqlQuery = 'update locatario set nome = ? , telefone = ?, dt_nascimento = ?, endereco = ?, email = ?, senha = ? where cpf = ?';
        const updatelocador = await connection.execute(sqlQuery, [nome, telefone, dt_nascimento, email, senha, endereco, cpf])
        return updateLocatarioPorCPF;

    } catch (error) {
        console.error('Erro ao inserir locador:', error);
        throw error;
    }
}

const updateLocatarioPorCnpj = async (cnpj, locatarioData) => {
    let { nome, telefone, dt_nascimento, endereco, email, senha } = locatarioData;
    try {
        const sqlQuery = 'update locador set nome = ? , telefone = ?, dt_nascimento = ?, endereco = ?, email = ?, senha = ? where cnpj = ?';
        const updatelocador = await connection.execute(sqlQuery, [nome, telefone, dt_nascimento, endereco, email, senha, cnpj])
        return updateLocatarioPorCnpj;

    } catch (error) {
        console.error('Erro ao inserir locador:', error);
        throw error;
    }
}

const deletarContaLocatario = async (res) => {
    try {
        let { cpf } = res
        const sqlQuery = 'DELETE FROM locatario WHERE cpf = ?';
        const deletarConta = await connection.execute(sqlQuery, [cpf]);
        return deletarConta;
    } catch (error) {
        console.error('Erro ao deletar conta:', error);
        throw error;
    }
}

const getLocatarioPorCpf = async (res) => {
    try {
        const { cpf } = res;
        const sqlQuery = 'SELECT * FROM locatario WHERE cpf =?';
        const result = await connection.query(sqlQuery, [cpf]);
        return result[0];
    } catch (error) {
        console.error('Erro ao consultar locador:', error);
        throw error;
    }
}

const getLocatarioPorCnpj = async (res) => {
    try {
        const { cnpj } = res;
        const sqlQuery = 'SELECT * FROM locatario WHERE cnpj=?';
        const result = await connection.query(sqlQuery, [cnpj]);
        return (result[0]);
    } catch (error) {
        console.error('Erro ao consultar locador:', error);
        throw error;
    }
}

module.exports = {
    insertLocatario,
    updateLocatarioPorCPF,
    updateLocatarioPorCnpj,
    deletarContaLocatario,
    getLocatarioPorCpf,
    getLocatarioPorCnpj
};