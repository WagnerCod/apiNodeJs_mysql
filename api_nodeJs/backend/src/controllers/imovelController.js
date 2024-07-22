const response = require("express");
const imovelModel = require('../models/imovelModel');

const createdImovel = async (req, res) => {
    try {
        const { id_locador, descricao, endereco_imovel, disponivel, tipo_imovel, img } = req.body;
        const imovelData = { id_locador, descricao, endereco_imovel, disponivel, tipo_imovel, img }
        const imovelOk = await imovelModel.createdImovel(imovelData);
        return res.status(200).json({ imovelOk: imovelOk, message: 'Imóvel cadastrado com sucesso' })
    } catch (error) {
        console.error('Erro ao cadastrar imóvel:', error);
        return res.status(500).json({ error: error.message })
    }

}

const getImovelID = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const getImovel = await imovelModel.getImovelID({ id });
        if (getImovel) {
            return res.status(200).json(getImovel);
        } else {
            res.status(401).json({ error: 'Verifique se o identificador do imóvel está correto' });
        }
    } catch (error) {
        console.error('Erro ao encontrar imóvel:', error);
        return res.status(500).json({ error: 'Erro ao encontrar imóvel' });
    }
}

const getAllImovel = async (_req, res) => {
    try {
        const getAllOk = await imovelModel.getAllImovel();
        if (getAllOk && getAllOk.length > 0) {
            return res.status(200).json(getAllOk);
        } else {
            res.status(401).json({ error: 'Tabela sem imóvel' });
        }
    } catch (error) {
        console.error('Erro ao encontrar imóvel:', error);
        return res.status(500).json({ error: 'Erro ao encontrar imóvel' })
    }
}

const updateImovel = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { id_locador, descricao, endereco_imovel, disponivel, tipo_imovel, img } = req.body;
        const imovelData = {id_locador, descricao, endereco_imovel, disponivel, tipo_imovel, img }
        const updateImovelOk = await imovelModel.updateImovel(id, imovelData);
        if (updateImovelOk) {
            return res.status(200).json({ message: 'Imóvel atualizado com sucesso' });
        } else {
            res.status(401).json({ error: 'verfique se os dados passados estão corretos' });
        }
    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
        res.status(500).json({ error: 'Erro ao atualizar dados' });
    }
}

const deleteImovel = async (req, res) => {
    try {
        const id = req.params.id; // Remove as chaves desnecessárias na desestruturação
        const deleteOk = await imovelModel.deleteImovel(id);
        if (deleteOk) {
            res.status(200).json({ message: 'deletado' });
        } else {
            res.status(401).json({ error: 'verfique o id do imovel' });
        }
    } catch (error) {
        console.error('Erro ao deletar imóvel:', error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createdImovel,
    deleteImovel,
    getImovelID,
    getAllImovel,
    updateImovel
}