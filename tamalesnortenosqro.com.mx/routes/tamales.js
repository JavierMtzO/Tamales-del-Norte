const express = require('express');

const router = express.Router();
const isAuth = require('../util/is-auth.js');

path = require('path')

router.use('/css', express.static(path.join(__dirname, 'public/css')));
router.use('/js', express.static(path.join(__dirname, 'public/js')));
router.use('/img', express.static(path.join(__dirname, 'public/img')));

const tamalesController = require('../controllers/tamales-controller');
const usuariosController = require('../controllers/usuarios-controller');
const compraController = require('../controllers/compra-controller');

router.get('/', tamalesController.get);

router.get('/registro', tamalesController.getRegistro);

router.get('/registro02', tamalesController.getRegistro02);
router.post('/registro02', tamalesController.postRegistro02);

router.get('/login', usuariosController.getLogin);
router.post('/login', usuariosController.postLogin);

router.get('/logout', usuariosController.logout);

router.get('/admin-perfil', isAuth, usuariosController.getAdminPerfil);
router.post('/admin-perfil', isAuth, usuariosController.postAdminPerfil);
router.get('/admin-editar-perfil', isAuth, usuariosController.getAdminEditarPerfil);
router.post('/admin-editar-perfil', isAuth, usuariosController.postAdminEditarPerfil);

router.get('/admin-pedidos', isAuth, usuariosController.getAdminPedidos);
router.post('/admin-pedidos', isAuth, usuariosController.postAdminPedidos);
router.get('/admin-editar-pedidos', isAuth, usuariosController.getAdminEditarPedidos);
router.post('/admin-editar-pedidos', isAuth, usuariosController.postAdminEditarPedidos);

router.get('/admin-clientes', isAuth, usuariosController.getAdminClientes);
router.post('/admin-clientes', isAuth, usuariosController.postAdminClientes);
router.get('/admin-editar-clientes', isAuth, usuariosController.getAdminEditarClientes);
router.post('/admin-editar-clientes', isAuth, usuariosController.postAdminEditarClientes);




router.get('/inicio', isAuth, tamalesController.getInicio);

router.get('/compra01', isAuth, compraController.getCompra01);
router.post('/compra01', isAuth, compraController.postCompra01);

router.get('/compra02', isAuth, compraController.getCompra02);
router.post('/compra02', isAuth, compraController.postCompra02);

router.get('/compra03', isAuth, compraController.getCompra03);
router.post('/compra03', isAuth, compraController.postCompra03);

router.get('/carrito', isAuth, compraController.getCarrito);
router.post('/carrito', isAuth, compraController.postCarrito);

router.get('/compra04', isAuth, compraController.getCompra04);
router.post('/compra04', isAuth, compraController.postCompra04);

router.get('/perfil', isAuth, usuariosController.getPerfil);
router.post('/perfil', isAuth, usuariosController.postPerfil);
router.get('/editar-perfil', isAuth, usuariosController.getEditarPerfil);
router.post('/editar-perfil', isAuth, usuariosController.postEditarPerfil);

router.get('/pedidos', isAuth, usuariosController.getPedidos);

module.exports = router;