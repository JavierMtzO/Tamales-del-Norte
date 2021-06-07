const express = require('express');

const router = express.Router();
const isAuth = require('../util/is-auth.js');

path = require('path')

// router.use('/css', express.static(path.join(__dirname, 'public/css')));
// router.use('/js', express.static(path.join(__dirname, 'public/js')));
// router.use('/img', express.static(path.join(__dirname, 'public/img')));

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
router.get('/admin-agregar-pedidos', isAuth, usuariosController.getAdminAgregarPedidos);
router.post('/admin-agregar-pedidos', isAuth, usuariosController.postAdminAgregarPedidos);

router.get('/admin-clientes', isAuth, usuariosController.getAdminClientes);
router.post('/admin-clientes', isAuth, usuariosController.postAdminClientes);
router.get('/admin-editar-clientes', isAuth, usuariosController.getAdminEditarClientes);
router.post('/admin-editar-clientes', isAuth, usuariosController.postAdminEditarClientes);

router.get('/admin-productos', isAuth, usuariosController.getAdminProductos);
router.post('/admin-productos', isAuth, usuariosController.postAdminProductos);
router.get('/admin-editar-productos', isAuth, usuariosController.getAdminEditarProductos);
router.post('/admin-editar-productos', isAuth, usuariosController.postAdminEditarProductos);
router.get('/admin-agregar-productos', isAuth, usuariosController.getAdminAgregarProductos);
router.post('/admin-agregar-productos', isAuth, usuariosController.postAdminAgregarProductos);

router.get('/admin-distribucion', isAuth, usuariosController.getAdminDistribucion);
router.post('/admin-distribucion', isAuth, usuariosController.postAdminDistribucion);
router.get('/admin-editar-distribucion', isAuth, usuariosController.getAdminEditarDistribucion);
router.post('/admin-editar-distribucion', isAuth, usuariosController.postAdminEditarDistribucion);
router.get('/admin-agregar-distribucion', isAuth, usuariosController.getAdminAgregarDistribucion);
router.post('/admin-agregar-distribucion', isAuth, usuariosController.postAdminAgregarDistribucion);

router.get('/admin-promociones', isAuth, usuariosController.getAdminPromocion);
router.post('/admin-promociones', isAuth, usuariosController.postAdminPromocion);
router.get('/admin-editar-promociones', isAuth, usuariosController.getAdminEditarPromocion);
router.post('/admin-editar-promociones', isAuth, usuariosController.postAdminEditarPromocion);

router.get('/admin-usuarios', isAuth, usuariosController.getAdminUsuarios);
router.post('/admin-usuarios', isAuth, usuariosController.postAdminUsuarios);
router.get('/admin-agregar-usuarios', isAuth, usuariosController.getAdminEditarUsuarios);
router.post('/admin-agregar-usuarios', isAuth, usuariosController.postAdminEditarUsuarios);


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