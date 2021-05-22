const nuevoCliente = require('../models/clientes.js');
const nuevaDistribucion = require('../models/distribucion.js')
const bcrypt = require('bcryptjs');

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
exports.getPerfil = (request, response, next) => {
    nuevoCliente.fetchOne(request.session.email)
        .then(([rowsUsuario, fieldData]) => {
            nuevoCliente.fetchColonia(request.session.idCliente)
                .then(([rowsColonia, fieldData]) => {
                    response.render('clientePerfil', {
                        usuario: rowsUsuario,
                        colonia: rowsColonia
                    });
                }).catch(err => {
                    console.log(err);
                });
        }).catch(err => {
            console.log(err);
        });

}
exports.getPedidos = (request, response, next) => {
    nuevoCliente.fetchPedidos(request.session.idCliente)
        .then(([rows, fieldData]) => {
            response.render('clientePedidos', {
                pedidos: rows
            });
        }).catch(err => {
            console.log(err);
        });
}