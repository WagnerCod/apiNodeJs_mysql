const validateBody = (request, response, next)=>{
    const { body } = request;
    if (body.title == undefined || body.title == ''){
        return response.status(400).json({ error: 'O título é obrigatório e não pode ser vazio' });
    }
    if (body.status == undefined || body.status == ''){
        return response.status(400).json({ error: 'O status é obrigatório e não pode ser vazio' });
    }

    //! se o title n é undefined ou vazio ele passa para o next
    next(); 
}

module.exports ={
    validateBody
};