const express = require('express');
const tasksController = require('./controllers/tasksControllers');
const router = express.Router();
const taskMiddleware = require('./middlewares/taksmoddlewares');
const locadorController = require('./controllers/locadorControllers')
const locatarioController = require('./controllers/lacatarioControllers');


// const locadorMiddleware = require('./middlewares/locadorModdlewares')
//! teste da api
router.get('/tasks', tasksController.getAll);
router.post('/tasks', taskMiddleware.validateBody, tasksController.insertCreateTask);
router.put('/tasks/:id', taskMiddleware.validateBody, tasksController.updateTask);
router.delete('/tasks/:id', tasksController.deleteTasks);

//* rotas locador
router.post('/locador', locadorController.insertLocador);  //!ok
router.put('/locador/:cpf', locadorController.updateLocadorPorCPF); //!ok
router.delete('/locador/delete/:cpf', locadorController.deletarContaLocador); 
router.get('/locador/cpf/:cpf', locadorController.getLocadorPorCpf); //!ok
router.get('/locador/cnpj/:cnpj', locadorController.getLocadorPorCnpj); 

//* rotas locatario
router.post('/locatario', locatarioController.insertLocatario); //!ok
router.put('/locatario/:cpf', locatarioController.updatelocatarioPorCPF); //!ok
router.delete('/locatario/delete/:cpf', locatarioController.deletarContalocatario);  //!ok
router.get('/locatario/cpf/:cpf', locatarioController.getlocatarioPorCpf); //!ok
router.get('/locatario/cnpj/:cnpj', locatarioController.getlocatarioPorCnpj);

module.exports = router; 