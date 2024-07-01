const express = require('express');
const tasksController = require('./controllers/tasksControllers');
const router = express.Router();
const taskMiddleware = require('./middlewares/taksmoddlewares');
const locadorController = require('./controllers/locadorControllers');
const locatarioController = require('./controllers/lacatarioControllers');
const usuarioController = require('./controllers/usuarioControllers');
const imovelController = require('./controllers/imovelController');
const contratoController = require('./controllers/contratoController');
const pagamentoController = require ('./controllers/pagamentoController');



// const locadorMiddleware = require('./middlewares/locadorModdlewares')
//! teste da api
router.get('/tasks', tasksController.getAll);
router.post('/tasks', taskMiddleware.validateBody, tasksController.insertCreateTask);
router.put('/tasks/:id', taskMiddleware.validateBody, tasksController.updateTask);
router.delete('/tasks/:id', tasksController.deleteTasks);

//* rotas locador
router.post('/api/wag/locador', locadorController.insertLocador);
router.put('/api/wag/locador/update/:cpf', locadorController.updateLocadorPorCPF);
router.delete('/api/wag/locador/delete/:cpf', locadorController.deletarContaLocador);
router.get('/api/wag/locador/cpf/:cpf', locadorController.getLocadorPorCpf);
router.get('/api/wag/locador/cnpj/:cnpj', locadorController.getLocadorPorCnpj);
router.get('/api/wag/locador/getAll', locadorController.getAllLocador);

//* rotas locatario
router.post('/api/wag/locatario', locatarioController.insertLocatario);
router.put('/api/wag/locatario/update/:cpf', locatarioController.updatelocatarioPorCPF);
router.delete('/api/wag/locatario/delete/:cpf', locatarioController.deletarContalocatario);
router.get('/api/wag/locatario/cpf/:cpf', locatarioController.getlocatarioPorCpf);
router.get('/api/wag/locatario/cnpj/:cnpj', locatarioController.getlocatarioPorCnpj);
router.get('/api/wag/locatarioAll', locatarioController.getLocatarioAll);

//*rotas login/User
router.post('/api/wag/usuario/createdUser', usuarioController.createdUser);
router.get('/api/wag/usuario/:id', usuarioController.getUsuario);
router.post('/api/wag/usuario/login', usuarioController.validateUser);
router.put('/api/wag/usuario/update/login/:id', usuarioController.updateLogin)
router.delete('/api/wag/usuario/delete/login/:id', usuarioController.deleteAccount)
router.get('/api/wag/usuario', usuarioController.getAllAccount);

//* rotas imoveis
router.post('/api/wag/imovel/createdImovel', imovelController.createdImovel);
router.get('/api/wag/imovel', imovelController.getAllImovel);
router.get('/api/wag/imovel/:id', imovelController.getImovelID);
router.put('/api/wag/imovel/update/:id', imovelController.updateImovel);
router.delete('/api/wag/imovel/delete/:id', imovelController.deleteImovel);

//* rotas contrato
router.post('/api/wag/contrato/createdContrato', contratoController.createdContrato);

router.get('/api/wag/contrato/get/cpf_locatario/:cpf', contratoController.getContratoCPFLocatario);
router.get('/api/wag/contrato/get/cnpj_locatario/:cnpj', contratoController.getContratoCNPJLocatario);

router.get('/api/wag/contrato/get/cpf_locador/:cpf', contratoController.getContratoCPFLocador);
router.get('/api/wag/contrato/get/cnpj_locador/:cnpj', contratoController.getContratoCNPJLocador);
router.delete('/api/wag/contrato/delete/:id', contratoController.deleteContrato);


//* rotas de pagamento
router.post('/api/wag/pagamento', pagamentoController.createdPagmamento);
router.get('/api/wag/pagamento/getpagamento/:id', pagamentoController.getPagamento)
router.delete('/api/wag/pagamento/deletepagamento/:id', pagamentoController.deletePagamento)

module.exports = router; 