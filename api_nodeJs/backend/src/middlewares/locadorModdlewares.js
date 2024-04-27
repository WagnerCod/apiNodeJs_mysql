const validateBody = (request, response, next)=>{
    if (body.nome == undefined || body.nome == ''){
        return response.status(400).json({ error: 'O título é obrigatório e não pode ser vazio' });
    }
    if (body.telefone == undefined || body.telefone == ''){
        return response.status(400).json({ error: 'O telefone é obrigatório e não pode ser vazio' });
    }
    if (body.dt_nascimento == undefined || body.dt_nascimento == ''){
        return response.status(400).json({ error: 'A data_nascimento é obrigatório e não pode ser vazio' });
    }
    if (body.email == undefined || body.email == ''){
        return response.status(400).json({ error: 'O EMAIL é obrigatório e não pode ser vazio' });
    }
    if (body.senha == undefined || body.senha == ''){
        return response.status(400).json({ error: 'A SENHA é obrigatório e não pode ser vazio' });
    }
    if (body.endereco == undefined || body.endereco == ''){
        return response.status(400).json({ error: 'O ENDEREÇO é obrigatório e não pode ser vazio' });
    }

    next();
}

module.exports = {
    validateBody
}