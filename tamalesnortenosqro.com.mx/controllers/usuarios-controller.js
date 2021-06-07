const nuevoCliente = require('../models/clientes.js');
const nuevoAdmin = require('../models/admin.js');
const nuevaDistribucion = require('../models/distribucion.js')
const nuevoPedido = require('../models/pedido.js')
const nuevoProducto = require('../models/producto.js')
const nuevaPromocion = require('../models/promocion.js')
const pedidoNuevo = require('../models/iniciarPedido.js')
const pedidoProducto = require('../models/pedidoproducto.js')
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
    request.session.conterror = undefined;
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
exports.postPerfil = (request, response, next) => {
    response.redirect('/editar-perfil');
}
exports.getEditarPerfil = (request, response, next) => {
    nuevoCliente.fetchOne(request.session.email)
        .then(([rowsUsuario, fieldData]) => {
            nuevoCliente.fetchColonia(request.session.idCliente)
                .then(([rowsColonia, fieldData]) => {
                    response.render('clienteEditarPerfil', {
                        error: request.session.conterror !== undefined ? request.session.conterror : false,
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
exports.postEditarPerfil = (request, response, next) => {
    request.session.conterror = undefined;
    if (request.body.password === request.body.retype) {
        nuevoCliente.updatePass(request.session.idCliente, request.body.password)
            .then(([rows, fieldData]) => {
                response.redirect('/perfil');
            }).catch(err => {
                console.log(err);
            });
    } else {
        request.session.conterror = "No coinciden las contraseñas insertadas";
        response.redirect('/editar-perfil');
    }
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


exports.getAdminPerfil = (request, response, next) => {
    request.session.conterror = undefined;
    nuevoAdmin.fetchPerfil(request.session.idAdmin)
        .then(([rows, fieldData]) => {
            response.render('adminPerfil', {
                usuario: rows
            });
        }).catch(err => {
            console.log(err);
        });
}
exports.postAdminPerfil = (request, response, next) => {
    response.redirect('/admin-editar-perfil');
}
exports.getAdminEditarPerfil = (request, response, next) => {
    nuevoAdmin.fetchPerfil(request.session.idAdmin)
        .then(([rows, fieldData]) => {
            response.render('adminEditarPerfil', {
                error: request.session.conterror !== undefined ? request.session.conterror : false,
                usuario: rows
            });
        }).catch(err => {
            console.log(err);
        });
}
exports.postAdminEditarPerfil = (request, response, next) => {
    request.session.conterror = undefined;
    if (request.body.password === request.body.retype) {
        nuevoAdmin.updatePass(request.session.idAdmin, request.body.password)
            .then(([rows, fieldData]) => {
                response.redirect('/admin-perfil');
            }).catch(err => {
                console.log(err);
            });
    } else {
        request.session.conterror = "No coinciden las contraseñas insertadas";
        response.redirect('/admin-editar-perfil');
    }
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
exports.getAdminAgregarPedidos = (request, response, next) => {
    nuevoProducto.fetchAll()
        .then(([rowsProductos, fieldData]) => {
            nuevoCliente.fetchAll()
                .then(([rowsCliente, fieldData]) => {
                    response.render('adminAgregarPedidos', {
                        clientes: rowsCliente,
                        productos: rowsProductos
                    });
                }).catch(err => {
                    console.log(err);
                });
        }).catch(err => {
            console.log(err);
        });

}
exports.postAdminAgregarPedidos = (request, response, next) => {
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
                }
            }
            request.session.descripcion = request.session.descripcion.slice(0, -2);
            if (request.body.entrega === 'domicilio') {
                request.session.costoTotal += 50;
            }
            pedidoNuevo.fetchDia(request.body.cliente)
                .then(([rowsDia, fieldData]) => {
                    request.session.fechaEntrega = "";
                    request.session.fechaEntrega += rowsDia[0].diaDeEntrega + " de " + rowsDia[0].horaInicioEntrega + " a " + rowsDia[0].horaFinalEntrega;
                    pedidoNuevo.savePedidoAdmin(request.session.fechaEntrega, 'En espera de pago', request.session.descripcion, request.body.entrega, request.session.total, request.session.costoTotal, request.body.cliente)
                        .then(([rowsPed, fieldData]) => {
                            request.session.idPedido = rowsPed.insertId;
                            for (let producto of rows) {
                                let string = "request.body."
                                let skuProducto = producto.sku;
                                string = string + skuProducto;
                                if (parseInt(eval(string)) > 0) {
                                    request.session.pedprod = new pedidoProducto(producto.idProducto, request.session.idPedido, parseInt(eval(string)));
                                    request.session.pedprod.save()
                                        .then(() => {
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                }
                            }
                            response.redirect('admin-pedidos');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => console.log(err));
}


exports.getAdminClientes = (request, response, next) => {
    request.session.adminIdCliente = 0;
    nuevoCliente.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('adminClientes', {
                clientes: rows
            });
        }).catch(err => {
            console.log(err);
        });
}
exports.postAdminClientes = (request, response, next) => {
    request.session.adminIdCliente = request.body.editarCliente;
    response.redirect('/admin-editar-clientes');
}
exports.getAdminEditarClientes = (request, response, next) => {
    nuevoCliente.fetchCliente(request.session.adminIdCliente)
        .then(([rows, fieldData]) => {
            nuevaDistribucion.fetchAll()
                .then(([dist, fieldData]) => {
                    response.render('adminEditarClientes', {
                        distribuciones: dist,
                        usuario: rows
                    });
                })
                .catch(err => console.log(err));
        }).catch(err => {
            console.log(err);
        });

}
exports.postAdminEditarClientes = (request, response, next) => {
    if (request.body.actualizar === 'true') {
        nuevoCliente.update(request.body.nombre, request.body.apellidos, request.body.telefono, request.body.direccion, request.body.referencia, request.body.email, request.body.colonia, request.session.adminIdCliente)
            .then(([rows, fieldData]) => {
                response.redirect('admin-clientes');
            }).catch(err => {
                console.log(err);
            });
    } else {
        nuevoCliente.delete(request.session.adminIdCliente)
            .then(([rows, fieldData]) => {
                response.redirect('admin-clientes');
            }).catch(err => {
                console.log(err);
            });
    }


}

exports.getAdminProductos = (request, response, next) => {
    request.session.adminIdProducto = 0;
    nuevoProducto.fetchAllProductos()
        .then(([rows, fieldData]) => {
            response.render('adminProductos', {
                productos: rows
            });
        }).catch(err => {
            console.log(err);
        });
}
exports.postAdminProductos = (request, response, next) => {
    request.session.adminIdProducto = request.body.editarProducto;
    response.redirect('/admin-editar-productos');
}
exports.getAdminEditarProductos = (request, response, next) => {
    nuevoProducto.fetchOne(request.session.adminIdProducto)
        .then(([rows, fieldData]) => {
            response.render('adminEditarProductos', {
                producto: rows[0]
            });
        }).catch(err => {
            console.log(err);
        });

}
exports.postAdminEditarProductos = (request, response, next) => {
    if (request.body.actualizar === 'true') {
        nuevoProducto.update(request.body.nombre, request.body.descripcion, request.body.precio, request.session.adminIdProducto)
            .then(([rows, fieldData]) => {
                response.redirect('admin-productos');
            }).catch(err => {
                console.log(err);
            });
    } else {
        nuevoProducto.delete(request.session.adminIdProducto)
            .then(([rows, fieldData]) => {
                response.redirect('admin-productos');
            }).catch(err => {
                console.log(err);
            });
    }
}
exports.getAdminAgregarProductos = (request, response, next) => {
    response.render('adminAgregarProducto');
}
exports.postAdminAgregarProductos = (request, response, next) => {
    let imageProducto = request.file.path;
    imageProducto = imageProducto.substring(7);
    const productoNuevo = new nuevoProducto(request.body.nombre, request.body.precio, request.body.descripcion, imageProducto);
    productoNuevo.save()
        .then(([rows, fieldData]) => {
            const pedproducto = new pedidoProducto(rows.insertId, 10001, 0);
            pedproducto.save()
                .then(([rows, fieldData]) => {
                    response.redirect('/admin-productos');
                }).catch(err => {
                    console.log(err);
                });
        }).catch(err => {
            console.log(err);
        });
}


exports.getAdminDistribucion = (request, response, next) => {
    request.session.editarDistribucion = 0;
    nuevaDistribucion.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('adminDistribucion', {
                distribuciones: rows
            });
        }).catch(err => {
            console.log(err);
        });
}
exports.postAdminDistribucion = (request, response, next) => {
    request.session.editarDistribucion = request.body.editarDistribucion;
    response.redirect('/admin-editar-distribucion');
}
exports.getAdminEditarDistribucion = (request, response, next) => {
    nuevaDistribucion.fetchOne(request.session.editarDistribucion)
        .then(([rowsOne, fieldData]) => {
            nuevaDistribucion.fetchAll()
                .then(([rows, fieldData]) => {
                    response.render('adminEditarDistribucion', {
                        dist: rowsOne[0],
                        distribuciones: rows
                    });
                }).catch(err => {
                    console.log(err);
                });
        }).catch(err => {
            console.log(err);
        });

}
exports.postAdminEditarDistribucion = (request, response, next) => {
    if (request.body.actualizar === 'true') {
        nuevaDistribucion.update(request.body.dia, request.body.horaInicio, request.body.horaFinal, request.session.editarDistribucion)
            .then(([rows, fieldData]) => {
                response.redirect('admin-distribucion');
            }).catch(err => {
                console.log(err);
            });
    } else {
        nuevaDistribucion.delete(request.session.editarDistribucion)
            .then(([rows, fieldData]) => {
                response.redirect('admin-distribucion');
            }).catch(err => {
                console.log(err);
            });
    }
}
exports.getAdminAgregarDistribucion = (request, response, next) => {
    response.render('adminAgregarDistribucion');

}
exports.postAdminAgregarDistribucion = (request, response, next) => {
    const dist = new nuevaDistribucion(request.body.dia, request.body.colonia, request.body.horaInicio, request.body.horaFinal);
    dist.save()
        .then(([rows, fieldData]) => {
            response.redirect('admin-distribucion');
        }).catch(err => {
            console.log(err);
        });

}

exports.getAdminPromocion = (request, response, next) => {
    request.session.adminIdPromocion = 0;
    nuevaPromocion.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('adminPromocion', {
                promociones: rows
            });
        }).catch(err => {
            console.log(err);
        });
}
exports.postAdminPromocion = (request, response, next) => {
    request.session.adminIdPromocion = request.body.editarPromocion;
    response.redirect('/admin-editar-promociones');
}
exports.getAdminEditarPromocion = (request, response, next) => {
    nuevaPromocion.fetchOne(request.session.adminIdPromocion)
        .then(([rows, fieldData]) => {
            response.render('adminEditarPromocion', {
                promocion: rows[0]
            });
        }).catch(err => {
            console.log(err);
        });

}
exports.postAdminEditarPromocion = (request, response, next) => {
    if (request.body.actualizar === 'true') {
        nuevaPromocion.update(request.body.descripcion, request.session.adminIdPromocion)
            .then(([rows, fieldData]) => {
                response.redirect('admin-promociones');
            }).catch(err => {
                console.log(err);
            });
    } else {
        nuevaPromocion.delete(request.session.adminIdPromocion)
            .then(([rows, fieldData]) => {
                response.redirect('admin-promociones');
            }).catch(err => {
                console.log(err);
            });
    }
}

exports.getAdminUsuarios = (request, response, next) => {
    request.session.errorAgregarUsuario = undefined;
    request.session.adminIdAdmin = 0;
    nuevoAdmin.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('adminUsuarios', {
                admins: rows
            });
        }).catch(err => {
            console.log(err);
        });
}
exports.postAdminUsuarios = (request, response, next) => {
    response.redirect('/admin-agregar-usuarios');
}
exports.getAdminEditarUsuarios = (request, response, next) => {
    response.render('adminAgregarUsuario', {
        error: request.session.errorAgregarUsuario !== undefined ? request.session.errorAgregarUsuario : false
    });

}
exports.postAdminEditarUsuarios = (request, response, next) => {
    request.session.errorAgregarUsuario = undefined;
    const admin = new nuevoAdmin(request.body.nombre, request.body.apellidos, request.body.email, request.body.password);
    admin.save()
        .then(([rows, fieldData]) => {
            response.redirect('/admin-usuarios');
        }).catch(err => {
            console.log(err);
            request.session.errorAgregarUsuario = "Este correo electrónico ya está registrado";
            response.redirect('/admin-agregar-usuarios');
        });
}