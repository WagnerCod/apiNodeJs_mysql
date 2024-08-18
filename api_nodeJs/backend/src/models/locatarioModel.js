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

const updateLocatario = async (id, locatarioData) => {
    console.log(locatarioData);
    try {
        const sqlQuery = 'UPDATE locatario SET nome_locatario = ?, cpf_locatario = ?, cnpj_locatario = ?, dt_nascimento = ?, endereco_locatario = ?, estado_civil = ?, telefone_locatario = ?, email_locatario = ?, dependentes = ? WHERE id_locatario = ?';
        const updatelocatarioOk = await connection.execute(sqlQuery, [locatarioData.nome, locatarioData.cpf, locatarioData.cnpj, locatarioData.dt_nascimento, locatarioData.endereco, locatarioData.estado_civil, locatarioData.telefone, locatarioData.email, locatarioData.dependentes, id]);

        return updatelocatarioOk;

    } catch (error) {
        console.error('Erro ao atualizar locatario:', error);
        throw error;A
    }
}

const deletarContaLocatario = async (id) => {
    try {
        const sqlQuery = 'DELETE FROM locatario WHERE id_locatario = ?';
        const deletarConta = await connection.execute(sqlQuery, [id]);
        return deletarContaLocatario;
    } catch (error) {
        console.error('Erro ao deletar conta:', error);
        throw error;
    }
}

const getLocatarioAll = async () => {
    try {
       ;
        const sqlQuery = 'SELECT * FROM locatario ORDER BY nome_locatario';
        const result = await connection.query(sqlQuery, []);
        return (result[0]);
    } catch (error) {
        console.error('Erro ao consultar locador:', error);
        throw error;
    }
}

module.exports = {
    insertLocatario,
    updateLocatario,
    deletarContaLocatario,
    getLocatarioPorCpf,
    getLocatarioPorCnpj,
    getLocatarioAll
};