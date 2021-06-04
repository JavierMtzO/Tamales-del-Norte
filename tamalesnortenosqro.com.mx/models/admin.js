const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class nuevoAdmin {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, apellidos, email, password) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        //Dentro del método del modelo que crea el usuario
        //El segundo argumento es el número de veces que se aplica el algoritmo, actualmente 12 se considera un valor seguro
        //El código es asíncrono, por lo que hay que regresar la promesa
        return bcrypt.hash(this.password, 12)
            .then((password) => {
                return db.execute('INSERT INTO admin (nombre, apellidos, correoElectronico, password) VALUES (?, ?, ?, ?)',
                    [this.nombre, this.apellidos, this.email, password]
                );
            })
            .catch(err => {
                console.log(err);
                throw Error("El correo electrónico ingresado ya está registrado como administrador.");
            });


    }

    static updatePass(id, password) {
        return bcrypt.hash(password, 12)
            .then((password) => {
                return db.execute('UPDATE admin SET password = ? WHERE idAdmin = ?',
                    [password, id]
                );
            })
            .catch(err => {
                console.log(err);
            });
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM admin');
    }
    static fetchOne(email) {
        return db.execute('SELECT * FROM admin WHERE correoElectronico = ?', [email]);
    }
    static fetchPerfil(id) {
        return db.execute('SELECT * FROM admin WHERE idAdmin = ?', [id]);
    }
    static login(correoElectronico, password) {
        return db.execute('SELECT * FROM admin WHERE ');
    }
    // static fetchPedidos(id) {
    //     return db.execute('SELECT diaEntrega, estatus, descripcion, costoTotal, cantidadTotal FROM pedido p, cliente c WHERE p.idCliente = c.idCliente AND p.idCliente =  ?', [id]);
    // }
    // static fetchColonia(id) {
    //     return db.execute('SELECT * FROM distribucion d, cliente c WHERE d.idDistribucion = c.idDistribucion AND idCliente =  ?', [id]);
    // }

}