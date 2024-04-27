
const connection = require('./connection');
const bcrypt = require('bcrypt');

const createdUser = async (usuarioData) => {
    console.log(usuarioData);
    try {
        // Gerar um salt (número aleatório) para a criptografia da senha
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
         // Criptografar a senha usando bcrypt.hash
         const passwordHash = await bcrypt.hash(usuarioData.senha, salt);

        let sqlQuery = 'INSERT INTO usuario (id_tipo_usuario, email, senha, ativo) VALUES (?, ?, ?, ?)';
        const result = await connection.execute(sqlQuery, [usuarioData.tipo_usuario, usuarioData.email, passwordHash, usuarioData.ativo]
        );
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
        const sqlQuery = 'SELECT id_usuario, email, senha FROM usuario WHERE email = ?';
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
                return { id_usuario: rows[0].id_usuario, email: rows[0].email }; 
            } else {
                return console.error('Senha incorreta');
            }
        } else {
            return null; // Retorna null se as credenciais forem inválidas
        }
    } catch (error) {
        console.error('Erro ao validar credenciais:', error);
        throw error;
    }
}


module.exports = {
    createdUser,
    getUsuario,
    validateUser

};
