const nuevoCliente = require('../models/clientes.js');
const nuevoProducto = require('../models/producto.js')
const nuevaPromocion = require('../models/promocion.js')
const nuevaDistribucion = require('../models/distribucion.js')
const nuevoPedido = require('../models/iniciarPedido.js')
const finalizarPedido = require('../models/pedido.js')

exports.get = (request, response, next) => {
    nuevoProducto.fetchAll()
        .then(([rowsProductos, fieldData]) => {
            nuevaPromocion.fetchAll()
                .then(([rowsPromociones, fieldData]) => {
                    nuevaDistribucion.fetchAll()
                        .then(([rowsDistribucion, fieldData]) => {
                            response.render('paginaInicio', {
                                distribuciones: rowsDistribucion,
                                productos: rowsProductos,
                                promociones: rowsPromociones,
                                titulo: "Tamales norteños"
                            });
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

exports.getRegistro = (request, response, next) => {
    response.render('registro01');
};
exports.getRegistro02 = (request, response, next) => {
    nuevaDistribucion.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('registro02', {
                distribuciones: rows,
                error: request.session.error !== undefined ? request.session.error : false,
                titulo: "Nuevo Cliente"
            });
        })
        .catch(err => console.log(err));

};
exports.postRegistro02 = (request, response, next) => {
    var colonia = request.body.colonia;
    var idColonia;
    switch (colonia) {
        case "Tejeda":
            idColonia = 8384;
            break;
        case "Jurica":
            idColonia = 8385;
            break;
        case "El Refugio":
            idColonia = 8386;
            break;
        case "Juriquilla":
            idColonia = 8387;
            break;
        case "La Vista":
            idColonia = 8388;
            break;
        case "Sonterra":
            idColonia = 8389;
            break;
        case "Balvanegra":
            idColonia = 8390;
            break;
        case "Zibata":
            idColonia = 8391;
            break;
        case "Campanario":
            idColonia = 8392;
            break;
        case "Cimatario":
            idColonia = 8393;
            break;
    }
    const cliente = new nuevoCliente(request.body.nombre, request.body.apellidos, request.body.telefono, request.body.direccion, request.body.referencia, request.body.email, idColonia, request.body.password);
    request.session.error = undefined;
    cliente.save()
        .then(([rows, fieldData]) => {
            request.session.idInicializarCliente = 0;
            request.session.idInicializarCliente = rows.insertId;
            const inicializarPedido = new nuevoPedido(request.session.idInicializarCliente);
            inicializarPedido.save()
                .then(([rowsPed, fieldData]) => {
                    request.session.idInicializarPedido = 0;
                    request.session.idInicializarPedido = rowsPed.insertId;
                    const finalizarPed = new finalizarPedido('Init', 'Init', 'Inicializar pedidos del cliente', 'Init', 0, 0);
                    finalizarPed.save(request.session.idInicializarPedido)
                        .then(([rows, fieldData]) => {
                            response.render('registro03');
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => {
                    console.log(err);
                });


        })
        .catch(err => {
            console.log(err);
            request.session.error = "Este correo electrónico ya está registrado";
            response.redirect('registro02');
        });
};
exports.getInicio = (request, response, next) => {
    nuevoProducto.fetchAll()
        .then(([rowsProductos, fieldData]) => {
            nuevaPromocion.fetchAll()
                .then(([rowsPromociones, fieldData]) => {
                    nuevaDistribucion.fetchAll()
                        .then(([rowsDistribucion, fieldData]) => {
                            response.render('inicio', {
                                usuario: request.session.user,
                                distribuciones: rowsDistribucion,
                                productos: rowsProductos,
                                promociones: rowsPromociones,
                                titulo: "Tamales norteños"
                            });
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};