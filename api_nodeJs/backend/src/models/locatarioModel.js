const connection = require('./connection');

const insertLocatario = async (locatarioData) => {
    console.log(locatarioData);
    try {
        // Prepara a query SQL para inserção
        let sqlQuery = 'INSERT INTO locatario(nome_locatario, cpf_locatario, dt_nascimento, endereco_locatario, cnpj_locatario, estado_civil, telefone_locatario, email_locatario, dependentes) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)';

        // Executa a query com os valores fornecidos
        const result = await connection.execute(sqlQuery, [locatarioData.nome, locatarioData.cpf, locatarioData.dt_nascimento, locatarioData.endereco, locatarioData.cnpj, locatarioData.estado_civil, locatarioData.telefone, locatarioData.email, locatarioData.dependentes]);

        // Retorna o ID do locador inserido
        return { insertId: result[0].insertId };
    } catch (error) {
        // Trata qualquer erro ocorrido durante a execução da query
        console.error('Erro ao inserir locador:', error);
        throw error;
    }
}

const updateLocatarioPorCPF = async (cpf, locatarioData) => {
    console.log(locatarioData);
    try {
        const sqlQuery = 'update locatario set nome_locatario = ? , dt_nascimento = ?, endereco_locatario = ?, estado_civil = ?, telefone_locatario = ?, email_locatario = ?, dependentes = ? where cpf_locatario = ?';
        const updatelocador = await connection.execute(sqlQuery, [locatarioData.nome, locatarioData.dt_nascimento, locatarioData.endereco, locatarioData.estado_civil, locatarioData.telefone, locatarioData.email, locatarioData.dependentes, cpf])
        return updateLocatarioPorCPF;

    } catch (error) {
        console.error('Erro ao inserir locador:', error);
        throw error;
    }
}

const updateLocatarioPorCnpj = async (cnpj, locatarioData) => {
    console.log(locatarioData);
    try {
        const sqlQuery = 'update locatario set nome_locatario = ? , dt_nascimento = ?, endereco_locatario = ?, estado_civil = ?, telefone_locatario = ?, email_locatario = ?, dependentes = ? where cnpj_locatario = ?';
        const updatelocador = await connection.execute(sqlQuery, [locatarioData.nome, locatarioData.dt_nascimento, locatarioData.endereco, locatarioData.estado_civil, locatarioData.telefone, locatarioData.email, locatarioData.dependentes, cnpj])
        return updateLocatarioPorCnpj;

    } catch (error) {
        console.error('Erro ao inserir locador:', error);
        throw error;
    }
}

const deletarContaLocatario = async (res) => {
    try {
        let { cpf } = res
        const sqlQuery = 'DELETE FROM locatario WHERE cpf_locatario = ?';
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
        const sqlQuery = 'SELECT * FROM locatario WHERE cpf_locatario =?';
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
        const sqlQuery = 'SELECT * FROM locatario WHERE cnpj_locatario=?';
        const result = await connection.query(sqlQuery, [cnpj]);
        return (result[0]);
    } catch (error) {
        console.error('Erro ao consultar locador:', error);
        throw error;
    }
}
const getLocatarioAll = async () => {
    try {
       ;
        const sqlQuery = 'SELECT * FROM locatario ;';
        const result = await connection.query(sqlQuery, []);
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
    getLocatarioPorCnpj,
    getLocatarioAll
};