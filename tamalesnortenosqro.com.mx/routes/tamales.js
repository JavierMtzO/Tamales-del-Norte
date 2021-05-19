const express = require('express');

const router = express.Router();
const isAuth = require('../util/is-auth.js');

path = require('path')

router.use('/css', express.static(path.join(__dirname, 'public/css')));
router.use('/js', express.static(path.join(__dirname, 'public/js')));
router.use('/img', express.static(path.join(__dirname, 'public/img')));

const tamalesController = require('../controllers/tamales-controller');

router.get('/', tamalesController.get);

router.get('/registro', tamalesController.getRegistro);

router.get('/registro02', tamalesController.getRegistro02);
router.post('/registro02', tamalesController.postRegistro02);

router.get('/login', tamalesController.getLogin);
router.post('/login', tamalesController.postLogin);

router.get('/logout', tamalesController.logout);

router.get('/inicio', isAuth, tamalesController.getInicio);

router.get('/compra01', isAuth, tamalesController.getCompra01);
router.post('/compra01', isAuth, tamalesController.postCompra01);

router.get('/compra02', isAuth, tamalesController.getCompra02);
router.post('/compra02', isAuth, tamalesController.postCompra02);

router.get('/compra03', isAuth, tamalesController.getCompra03);
router.post('/compra03', isAuth, tamalesController.postCompra03);

router.get('/compra04', isAuth, tamalesController.getCompra04);
router.post('/compra04', isAuth, tamalesController.postCompra04);

module.exports = router;