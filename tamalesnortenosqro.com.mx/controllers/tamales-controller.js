const nuevoCliente = require('../models/clientes.js');
const nuevaDistribucion = require('../models/distribucion.js')
const nuevoProducto = require('../models/producto.js')
const nuevaPromocion = require('../models/promocion.js')
const pedidoProducto = require('../models/pedidoproducto.js')
const pedidoNuevo = require('../models/iniciarPedido.js')
const finalizarPedido = require('../models/pedido.js')
const db = require('../util/database');
const bcrypt = require('bcryptjs');

exports.get = (request, response, next) => {
    nuevoProducto.fetchAll()
        .then(([rowsProductos, fieldData]) => {
            nuevaPromocion.fetchAll()
                .then(([rowsPromociones, fieldData]) => {
                    response.render('paginaInicio', {
                        productos: rowsProductos,
                        promociones: rowsPromociones,
                        titulo: "Tamales norteños"
                    });
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
        .then(() => {
            response.render('registro03');
        })
        .catch(err => {
            console.log(err);
            request.session.error = "Este correo electrónico ya está registrado";
            response.redirect('registro02');
        });
};
exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};
exports.getLogin = (request, response, next) => {
    response.render('login', {
        error: request.session.error !== undefined ? request.session.error : false,
        titulo: "Iniciar sesion",
    });
};
exports.postLogin = (request, response, next) => {
    request.session.error = undefined;
    request.session.email = request.body.email;
    nuevoCliente.fetchOne(request.session.email)
        .then(([rows, fieldData]) => {
            bcrypt.compare(request.body.password, rows[0].password)
                .then(doMatch => {
                    if (doMatch) {
                        request.session.isLoggedIn = true;
                        request.session.user = rows[0].nombre;
                        request.session.idCliente = rows[0].idCliente;
                        return request.session.save(err => {
                            response.redirect('/inicio');
                        });
                    }
                    request.session.error = "Usuario y/o contraseña incorrectos";
                    response.redirect('login');
                }).catch(err => {
                    request.session.error = "Usuario y/o contraseña incorrectos";
                    response.redirect('login');
                });
        }).catch(err => {
            console.log(err);
            request.session.error = "Usuario y/o contraseña incorrectos";
            response.redirect('login');
        });
};
exports.getInicio = (request, response, next) => {
    // response.render('inicio', {
    //     usuario: nombre,
    // });
    nuevoProducto.fetchAll()
        .then(([rowsProductos, fieldData]) => {
            nuevaPromocion.fetchAll()
                .then(([rowsPromociones, fieldData]) => {
                    response.render('inicio', {
                        usuario: request.session.user,
                        productos: rowsProductos,
                        promociones: rowsPromociones,
                        titulo: "Tamales norteños"
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};
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
                        const pedprod = new pedidoProducto(producto.idProducto, request.session.idPedido, parseInt(eval(string)));
                        pedprod.save()
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
        return db.execute('DELETE FROM pedido WHERE idPedido = ?', [idPedido])
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
    const pedido = new pedidoNuevo();
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
        response.redirect('compra04');
    } else {
        return db.execute('DELETE FROM pedido WHERE idPedido = ?', [request.session.idPedido])
            .then(() => {
                request.session.descripcion = "";
                request.session.total = 0;
                request.session.costoTotal = 0;
                request.session.costoEntrega = 0;
                request.session.tipoEntrega = "";
                response.redirect('inicio');
            })
            .catch(err => {
                console.log(err);
            });
    }
};
exports.getCompra04 = (request, response, next) => {
    request.session.costoTotal += request.session.costoEntrega;

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
};
exports.postCompra04 = (request, response, next) => {
    response.render('compra04', {
        usuario: request.session.user,
    });
};
exports.getCliente = (request, response, next) => {
    nuevoCliente.fetchOne(request.session.email)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render('perfilCliente', {
                usuario: rows
            });
        }).catch(err => {
            console.log(err);
        });
}