const connection = require('./connection');
const bcrypt = require('bcrypt');

const createdUser = async (usuarioData) => {
    console.log(usuarioData);
    try {
        // Verifica se o email já está cadastrado
        const [existingUser] = await connection.execute('SELECT id_usuario FROM usuario WHERE email = ?', [usuarioData.email]);
        if (existingUser.length > 0) {
            throw new Error('Email já cadastrado. Por favor, escolha outro email.');
        }

        // Gerar um salt (número aleatório) para a criptografia da senha
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        // Criptografar a senha usando bcrypt.hash
        const passwordHash = await bcrypt.hash(usuarioData.senha, salt);

        // Inserir o novo usuário no banco de dados
        let sqlQuery = 'INSERT INTO usuario (id_tipo_usuario, email, senha, ativo) VALUES (?, ?, ?, ?)';
        const result = await connection.execute(sqlQuery, [usuarioData.tipo_usuario, usuarioData.email, passwordHash, usuarioData.ativo]);
        
        return { id_usuario: result[0].insertId };
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

const getUsuario = async (usuarioData) => {
    console.log(usuarioData);
    try {
        const sqlQuery = 'SELECT email, senha FROM usuario WHERE id_usuario = ?';
        const [rows] = await connection.execute(sqlQuery, [usuarioData.id]);

        if (rows.length > 0) {
            return rows[0]; // Retorna o primeiro usuário encontrado
        } else {
            return null; // Retorna null se nenhum usuário for encontrado
        }
    } catch (error) {
        console.error('Erro ao obter usuário:', error);
        throw error;
    }
}

const validateUser = async (loginData) => {
    console.log(loginData);
    try {
        const sqlQuery = 'SELECT id_usuario, id_tipo_usuario, email, senha FROM usuario WHERE email = ?';
        const [rows] = await connection.execute(sqlQuery, [loginData.email]);

        if (rows.length > 0) {
            console.log(rows[0].senha);
            const passwordCrypto = rows[0].senha;

            if (!loginData.password || loginData.password.trim() === '') {
                return console.error('Senha vazia ou indefinida');
            }

            // Compare senhas usando bcrypt.compare
            const passwordCorrect = await bcrypt.compare(loginData.password, passwordCrypto);

            if (passwordCorrect) {
                return { id_usuario: rows[0].id_usuario, email: rows[0].email, tipo_usuario: rows[0].id_tipo_usuario};
            } else {
                return console.error('Senha incorreta');
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error('Erro ao validar credenciais:', error);
        throw error;
    }
}

const updateLogin = async (id, loginData) => {
    console.log(id);
    console.log(loginData);
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(loginData.senha, salt);

        const sqlQuery = 'UPDATE usuario SET email = ?, senha = ?, ativo = ? where id_usuario = ?';

        const updateAccount = await connection.execute(sqlQuery, [loginData.email, passwordHash, loginData.ativo, id]);
        return updateLogin;
    } catch (error) {
        console.error('Erro ao atualizar conta:', error);
        throw error;
    }
}

const deleteAccount = async (id) => {
    console.log(id);
    try {
        const sqlQuery = 'DELETE FROM usuario where id_usuario = ?'
        const deleteAcc = await connection.execute(sqlQuery, [id]);
        return deleteAccount;
    } catch (error) {
        console.error('Erro ao deletar conta:', error);
        throw error;
    }
}

const getAllAccount = async () =>{
    try {
        const sqlQuery = 'select * from usuario';
        const getAll= await connection.execute(sqlQuery)
        return getAll[0];
    }catch(error){
        console.error('Ouve algum erro:', error);
        throw error;
    }
}


module.exports = {
    createdUser,
    getUsuario,
    validateUser,
    updateLogin,
    deleteAccount,
    getAllAccount

};
