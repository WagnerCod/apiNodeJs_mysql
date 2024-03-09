const { response } = require('express');
const tasksModel = require('../models/tasksModel');


const getAll = async (_request, response) =>{
    const tasks = await tasksModel.getAll();
    return response.status(200).json(tasks);
    //({message: 'controller está tudo certo!'})
};

const createTask = async (request, response) =>{
    const createTask = await tasksModel.createTask();
    return response.status(201).json(createTask);
}
module.exports = {
    getAll, 
    createTask
}