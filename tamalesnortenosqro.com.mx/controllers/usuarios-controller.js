const nuevoCliente = require('../models/clientes.js');
const nuevoAdmin = require('../models/admin.js');
const nuevaDistribucion = require('../models/distribucion.js')
const nuevoPedido = require('../models/pedido.js')
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
        .then(([rowsCliente, fieldData]) => {
            bcrypt.compare(request.body.password, rowsCliente[0].password)
                .then(doMatch => {
                    if (doMatch) {
                        request.session.isLoggedIn = true;
                        request.session.user = rowsCliente[0].nombre;
                        request.session.idCliente = rowsCliente[0].idCliente;
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
            nuevoAdmin.fetchOne(request.session.email)
                .then(([rowsAdmin, fieldData]) => {
                    bcrypt.compare(request.body.password, rowsAdmin[0].password)
                        .then(doMatch => {
                            if (doMatch) {
                                request.session.isLoggedIn = true;
                                request.session.user = rowsAdmin[0].nombre;
                                request.session.idAdmin = rowsAdmin[0].idAdmin;
                                return request.session.save(err => {
                                    response.redirect('/admin-pedidos');
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

exports.getAdminPedidos = (request, response, next) => {
    request.session.adminIdPedido = 0;
    nuevoPedido.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('adminPedidos', {
                pedidos: rows
            });
        }).catch(err => {
            console.log(err);
        });
}
exports.postAdminPedidos = (request, response, next) => {
    request.session.adminIdPedido = request.body.editar;
    response.redirect('/admin-editar-pedidos');
}
exports.getAdminEditarPedidos = (request, response, next) => {
    nuevoPedido.fetchOne(request.session.adminIdPedido)
        .then(([rows, fieldData]) => {
            response.render('adminEditarPedidos', {
                pedidos: rows[0]
            });
        }).catch(err => {
            console.log(err);
        });

}
exports.postAdminEditarPedidos = (request, response, next) => {
    if (request.body.actualizar === 'true') {
        nuevoPedido.saveStatus(request.body.estatus, request.session.adminIdPedido)
            .then(([rows, fieldData]) => {
                response.redirect('admin-pedidos');
            }).catch(err => {
                console.log(err);
            });
    } else {
        nuevoPedido.delete(request.session.adminIdPedido)
            .then(([rows, fieldData]) => {
                response.redirect('admin-pedidos');
            }).catch(err => {
                console.log(err);
            });
    }


}


exports.getAdminClientes = (request, response, next) => {
    request.session.adminIdPedido = 0;
    nuevoPedido.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('adminPedidos', {
                pedidos: rows
            });
        }).catch(err => {
            console.log(err);
        });
}
exports.postAdminClientes = (request, response, next) => {
    request.session.adminIdPedido = request.body.editar;
    response.redirect('/admin-editar-pedidos');
}
exports.getAdminEditarClientes = (request, response, next) => {
    nuevoPedido.fetchOne(request.session.adminIdPedido)
        .then(([rows, fieldData]) => {
            response.render('adminEditarPedidos', {
                pedidos: rows[0]
            });
        }).catch(err => {
            console.log(err);
        });

}
exports.postAdminEditarClientes = (request, response, next) => {
    if (request.body.actualizar === 'true') {
        nuevoPedido.saveStatus(request.body.estatus, request.session.adminIdPedido)
            .then(([rows, fieldData]) => {
                response.redirect('admin-pedidos');
            }).catch(err => {
                console.log(err);
            });
    } else {
        nuevoPedido.delete(request.session.adminIdPedido)
            .then(([rows, fieldData]) => {
                response.redirect('admin-pedidos');
            }).catch(err => {
                console.log(err);
            });
    }


}