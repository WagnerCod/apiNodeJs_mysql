const { response } = require('express');
const tasksModel = require('../models/tasksModel');


const getAll = async (_request, response) =>{
    const tasks = await tasksModel.getAll();
    return response.status(200).json(tasks);
    //({message: 'controller está tudo certo!'})
};

const insertCreateTask = async (request, response) =>{
    const { title } = request.body;
    const createTask = await tasksModel.InsertcreateTask({title});
    return response.status(201).json({task: createTask, message: 'Sucesso ao inserir'});
};

const updateTask = async (request, response) => {
    const { id } = request.params;
    idNumber = Number(id);
    const { title, status } = request.body;
    const updateTask = await tasksModel.updateTask(idNumber, { title, status });
    return response.status(200).json({message:'Tarefa atualizada com sucesso!'});
};

const deleteTasks = async (request,response) =>{
    let {id} = request.params;
    await tasksModel.deleteTask({id});
    return response.status(200).json({message: 'Deletado com sucesso'});
}
module.exports = {
    getAll, 
    insertCreateTask,
    updateTask,
    deleteTasks
}