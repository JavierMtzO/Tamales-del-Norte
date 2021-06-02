const nuevoProducto = require('../models/producto.js')
const pedidoProducto = require('../models/pedidoproducto.js')
const pedidoNuevo = require('../models/iniciarPedido.js')
const finalizarPedido = require('../models/pedido.js')
const nuevaDistribucion = require('../models/distribucion.js')
const db = require('../util/database');
const TWILIO_ID = 'AC3c04cd07683d579474a22d910438ffc4';
const TWILIO_SK = '0d44d965c725d9969593d86f8a78776b';

const client = require('twilio')(TWILIO_ID, TWILIO_SK);

exports.getCompra01 = (request, response, next) => {
    response.render('compra01', {
        usuario: request.session.user,
    });
};
exports.postCompra01 = (request, response, next) => {
    if (request.body.aceptar) {
        request.session.siguiente = true;
    } else {
        request.session.siguiente = false;
    }
    if (request.session.siguiente) {
        const pedido = new pedidoNuevo(request.session.idCliente);
        pedido.save()
            .then(([rows, fieldData]) => {
                request.session.idPedido = rows.insertId;
                response.redirect('compra02');
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        response.redirect('inicio');
    }

};
exports.getCompra02 = (request, response, next) => {
    nuevoProducto.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('compra02', {
                error: request.session.error !== undefined ? request.session.error : false,
                usuario: request.session.user,
                productos: rows,
                titulo: "Paso 2 compra"
            });
        })
        .catch(err => console.log(err));
};
exports.postCompra02 = (request, response, next) => {
    if (request.body.aceptar) {
        request.session.siguiente = true;
    } else {
        request.session.siguiente = false;
    }
    if (request.session.siguiente) {
        request.session.error = undefined;
        nuevoProducto.fetchAll()
            .then(([rows, fieldData]) => {
                request.session.descripcion = "";
                request.session.total = 0;
                request.session.costoTotal = 0;
                for (let producto of rows) {
                    let string = "request.body."
                    let skuProducto = producto.sku;
                    string = string + skuProducto;
                    let costo = parseInt(eval(string)) * producto.precio;
                    request.session.total += parseInt(eval(string));
                    request.session.costoTotal += costo;
                    if (parseInt(eval(string)) > 0) {
                        var auxiliar = parseInt(eval(string));
                        var aux = auxiliar.toString();
                        request.session.descripcion += skuProducto + ": " + aux + ", ";
                        request.session.pedprod = new pedidoProducto(producto.idProducto, request.session.idPedido, parseInt(eval(string)));
                        request.session.pedprod.save()
                            .then(() => {
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                }
                request.session.descripcion = request.session.descripcion.slice(0, -2);
                if (request.session.total > 14) {
                    response.redirect('compra03');
                } else {
                    return db.execute('DELETE FROM pedidoproducto WHERE idPedido = ?', [request.session.idPedido])
                        .then(() => {
                            request.session.error = "Su pedido debe de ser mínimo de 15 elementos";
                            request.session.descripcion = "";
                            request.session.total = 0;
                            request.session.costoTotal = 0;
                            response.redirect('compra02');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
            .catch(err => console.log(err));
    } else {
        return db.execute('DELETE FROM pedido WHERE idPedido = ?', [request.session.idPedido])
            .then(() => {
                request.session.descripcion = "";
                request.session.total = 0;
                request.session.costoTotal = 0;
                response.redirect('inicio');
            })
            .catch(err => {
                console.log(err);
            });
    }
};
exports.getCompra03 = (request, response, next) => {
    response.render('compra03', {
        usuario: request.session.user,
        titulo: "Paso 3 compra"
    });
};
exports.postCompra03 = (request, response, next) => {
    request.session.tipoEntrega = "";
    if (request.body.aceptar) {
        request.session.siguiente = true;
    } else {
        request.session.siguiente = false;
    }
    if (request.session.siguiente) {
        request.session.tipoEntrega = request.body.entrega;
        switch (request.session.tipoEntrega) {
            case "domicilio":
                request.session.costoEntrega = 50;
                break;
            case "sucursal":
                request.session.costoEntrega = 0;
                break;
        }
        response.redirect('carrito');
    } else {
        return db.execute('DELETE FROM pedido WHERE idPedido = ?', [request.session.idPedido])
            .then(() => {
                request.session.descripcion = "";
                request.session.total = 0;
                request.session.costoTotal = 0;
                request.session.costoEntrega = 0;
                request.session.tipoEntrega = "";
                return db.execute('DELETE FROM pedidoproducto WHERE idPedido = ?', [request.session.idPedido])
                    .then(() => {
                        response.redirect('inicio');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
};
exports.getCarrito = (request, response, next) => {
    request.session.costoTotal += request.session.costoEntrega;
    nuevaDistribucion.fetchAll()
        .then(([rowsDistribucion, fieldData]) => {
            pedidoProducto.fetchOne(request.session.idPedido)
                .then(([rowsPedProd, fieldData]) => {
                    response.render('carrito', {
                        pedido: rowsPedProd,
                        entrega: request.session.costoEntrega,
                        costo: request.session.costoTotal,
                        colonia: rowsDistribucion
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => console.log(err));
}
exports.postCarrito = (request, response, next) => {


    if (request.body.finalizar) {
        response.redirect('compra04');
    }
    if (request.body.actualizar) {
        request.session.error = undefined;
        nuevoProducto.fetchAll()
            .then(([rows, fieldData]) => {
                request.session.descripcion = "";
                request.session.total = 0;
                request.session.costoTotal = 0;
                for (let productos of rows) {
                    // console.log(request.session.total);
                    // console.log(request.session.costoTotal);
                    let stringCarrito = "request.body."
                    let skuProductoCarrito = productos.sku;
                    stringCarrito = stringCarrito + skuProductoCarrito;
                    if (!(Number.isNaN(parseInt(eval(stringCarrito))))) {
                        let costoCarrito = parseInt(eval(stringCarrito)) * productos.precio;
                        request.session.total += parseInt(eval(stringCarrito));
                        request.session.costoTotal += costoCarrito;
                    }
                    if (parseInt(eval(stringCarrito)) > 0) {
                        let auxiliarCarrito = parseInt(eval(stringCarrito));
                        let auxCarrito = auxiliarCarrito.toString();
                        request.session.descripcion += skuProductoCarrito + ": " + auxCarrito + ", ";
                        pedidoProducto.update(parseInt(eval(stringCarrito)), request.session.idPedido, productos.idProducto)
                            .then(() => {
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                }
                request.session.descripcion = request.session.descripcion.slice(0, -2);
                if (request.session.total > 14) {
                    response.redirect('carrito');
                } else {
                    response.redirect('carrito');
                }
            })
            .catch(err => console.log(err));
    }
    if (request.body.cancelar) {
        return db.execute('DELETE FROM pedido WHERE idPedido = ?', [request.session.idPedido])
            .then(() => {
                request.session.descripcion = "";
                request.session.total = 0;
                request.session.costoTotal = 0;
                request.session.costoEntrega = 0;
                request.session.tipoEntrega = "";
                return db.execute('DELETE FROM pedidoproducto WHERE idPedido = ?', [request.session.idPedido])
                    .then(() => {
                        response.redirect('inicio');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
}
exports.getCompra04 = (request, response, next) => {

    client.messages
        .create({
            mediaUrl: ['https://4.bp.blogspot.com/-NMtSes4RP84/XBf0SSUToRI/AAAAAAAAEVA/kMQv7waP8UkFmP4N7nBY2FAbU-kMVcqOwCLcBGAs/s1600/654646.jpg'],
            from: 'whatsapp:+14155238886',
            body: 'Nuevo pedido para Tamales Norteños: ' + '*' + request.session.descripcion + '*',
            to: 'whatsapp:+5214499048658'
        })
        .then((message) => {
            console.log(message.sid);
            return db.execute('SELECT diaDeEntrega, horaInicioEntrega, horaFinalEntrega FROM distribucion d, pedido p, cliente c WHERE p.idCliente = c.idCliente AND d.idDistribucion = c.idDistribucion AND idPedido = ?', [request.session.idPedido])
                .then(([rows, fieldData]) => {
                    request.session.fechaEntrega = "";
                    request.session.fechaEntrega += rows[0].diaDeEntrega + " de " + rows[0].horaInicioEntrega + " a " + rows[0].horaFinalEntrega;
                    const pedidoFinal = new finalizarPedido(request.session.fechaEntrega, 'En espera de pago', request.session.descripcion, request.session.tipoEntrega, request.session.total, request.session.costoTotal);
                    pedidoFinal.save(request.session.idPedido)
                        .then(([rows, fieldData]) => {
                            response.render('compra04', {
                                usuario: request.session.user,
                                costo: request.session.costoTotal
                            });
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })


    // return db.execute('SELECT diaDeEntrega, horaInicioEntrega, horaFinalEntrega FROM distribucion d, pedido p, cliente c WHERE p.idCliente = c.idCliente AND d.idDistribucion = c.idDistribucion AND idPedido = ?', [request.session.idPedido])
    //     .then(([rows, fieldData]) => {
    //         request.session.fechaEntrega = "";
    //         request.session.fechaEntrega += rows[0].diaDeEntrega + " de " + rows[0].horaInicioEntrega + " a " + rows[0].horaFinalEntrega;
    //         const pedidoFinal = new finalizarPedido(request.session.fechaEntrega, 'En espera de pago', request.session.descripcion, request.session.tipoEntrega, request.session.total, request.session.costoTotal);
    //         pedidoFinal.save(request.session.idPedido)
    //             .then(([rows, fieldData]) => {
    //                 response.render('compra04', {
    //                     usuario: request.session.user,
    //                     costo: request.session.costoTotal
    //                 });
    //             })
    //             .catch(err => console.log(err));
    //     })
    //     .catch(err => console.log(err));
};
exports.postCompra04 = (request, response, next) => {
    response.render('compra04', {
        usuario: request.session.user,
    });
};