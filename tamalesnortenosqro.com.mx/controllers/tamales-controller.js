const nuevoCliente = require('../models/clientes.js');
const nuevaDistribucion = require('../models/distribucion.js')
const nuevoProducto = require('../models/producto.js')
const nuevaPromocion = require('../models/promocion.js')
const pedidoProducto = require('../models/pedidoproducto.js')
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
let nombre;
exports.postLogin = (request, response, next) => {
    request.session.error = undefined;
    nuevoCliente.fetchOne(request.body.email)
        .then(([rows, fieldData]) => {
            nombre = rows[0].nombre;
            bcrypt.compare(request.body.password, rows[0].password)
                .then(doMatch => {
                    if (doMatch) {
                        request.session.isLoggedIn = true;
                        request.session.user = rows[0].nombre;
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
                        usuario: nombre,
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
        usuario: nombre,
    });
};
exports.getCompra02 = (request, response, next) => {
    nuevoProducto.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('compra02', {
                error: request.session.error !== undefined ? request.session.error : false,
                usuario: nombre,
                productos: rows,
                titulo: "Paso 2 compra"
            });
        })
        .catch(err => console.log(err));
};
var total = 0;
let descripcion = "";
exports.postCompra02 = (request, response, next) => {
    request.session.error = undefined;
    nuevoProducto.fetchAll()
        .then(([rows, fieldData]) => {
            var iCounter = 0;
            for (let producto of rows) {
                let string = "request.body."
                let skuProducto = producto.sku;
                string = string + skuProducto;
                total += parseInt(eval(string));
                console.log(skuProducto);
                console.log(producto.idProducto);
                console.log(parseInt(eval(string)));
                console.log(eval(string));
                if (parseInt(eval(string)) > 0) {
                    var auxiliar = parseInt(eval(string));
                    var aux = auxiliar.toString();
                    descripcion += skuProducto + ": " + aux + ", ";
                    const pedprod = new pedidoProducto(producto.idProducto, 10017, parseInt(eval(string)));
                    pedprod.save()
                        .then(() => {
                            console.log("Registro de " + skuProducto);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
            descripcion = descripcion.slice(0, -2);
            console.log(descripcion);

            if (total > 14) {
                response.redirect('compra03');
            } else {
                request.session.error = "Su pedido debe de ser mínimo de 15 elementos";
                descripcion = "";
                response.redirect('compra02');
            }
        })
        .catch(err => console.log(err));
};
exports.getCompra03 = (request, response, next) => {
    response.render('compra03', {
        usuario: nombre,
        titulo: "Paso 3 compra"
    });
};
var costoEntrega;
exports.postCompra03 = (request, response, next) => {
    // response.render('compra03', {
    //     usuario: nombre,
    //     titulo: "Paso 3 compra"
    // });
    let tipoEntrega;
    tipoEntrega = request.body.entrega;
    switch (tipoEntrega) {
        case "domicilio":
            costoEntrega = 50;
            break;
        case "sucursal":
            costoEntrega = 0;
            break;
    }
    response.redirect('compra04');
};
exports.getCompra04 = (request, response, next) => {
    console.log("Hola desde compra 4");
    console.log(nombre);
    console.log(total);
    console.log(costoEntrega);
    response.render('compra04', {
        usuario: nombre,
    });
};
exports.postCompra04 = (request, response, next) => {
    response.render('compra04', {
        usuario: nombre,
    });
};