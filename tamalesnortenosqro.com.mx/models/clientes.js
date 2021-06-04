const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class nuevoCliente {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, apellidos, telefono, direccion, referencia, email, idDistribucion, password) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.direccion = direccion;
        this.referencia = referencia;
        this.email = email;
        this.idDistribucion = idDistribucion;
        this.password = password;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        //Dentro del método del modelo que crea el usuario
        //El segundo argumento es el número de veces que se aplica el algoritmo, actualmente 12 se considera un valor seguro
        //El código es asíncrono, por lo que hay que regresar la promesa
        return bcrypt.hash(this.password, 12)
            .then((password) => {
                return db.execute('INSERT INTO cliente (nombre, apellidos, telefono, direccion, referenciaDomicilio, correoElectronico, idDistribucion, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [this.nombre, this.apellidos, this.telefono, this.direccion, this.referencia, this.email, this.idDistribucion, password]
                );
            })
            .catch(err => {
                console.log(err);
                throw Error("El correo electrónico ingresado ya está registrado. Favor de ingresar uno nuevo o iniciar sesión.");
            });


    }

    static updatePass(id, password) {
        return bcrypt.hash(password, 12)
            .then((password) => {
                return db.execute('UPDATE cliente SET password = ? WHERE idCliente = ?',
                    [password, id]
                );
            })
            .catch(err => {
                console.log(err);
            });
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static delete(idCliente) {
        return db.execute('DELETE FROM cliente WHERE idCliente = ?',
            [idCliente])
            .then(() => {
                return db.execute('DELETE FROM pedido WHERE idCliente = ?',
                    [idCliente]);
            });
    }

    static fetchAll() {
        return db.execute('SELECT c.idCliente, c.nombre, c.apellidos, d.nombreDeColonia, SUM(costoTotal) as totalGastado FROM cliente c, distribucion d, pedido p WHERE c.idDistribucion = d.idDistribucion AND p.idCliente = c.idCliente GROUP BY c.nombre, c.apellidos, d.nombreDeColonia, c.idCliente');
    }
    static fetchOne(email) {
        return db.execute('SELECT * FROM cliente WHERE correoElectronico = ?', [email]);
    }

    static fetchCliente(id) {
        return db.execute('SELECT * FROM cliente c, pedido pe, distribucion d WHERE c.idCliente = pe.idCliente AND d.idDistribucion = c.idDistribucion AND c.idCliente = ?', [id]);
    }

    static login(correoElectronico, password) {
        return db.execute('SELECT * FROM cliente WHERE ');
    }
    static fetchPedidos(id) {
        return db.execute('SELECT diaEntrega, estatus, descripcion, costoTotal, cantidadTotal FROM pedido p, cliente c WHERE p.idCliente = c.idCliente AND p.idCliente =  ? AND costoTotal > 0', [id]);
    }
    static fetchColonia(id) {
        return db.execute('SELECT * FROM distribucion d, cliente c WHERE d.idDistribucion = c.idDistribucion AND idCliente =  ?', [id]);
    }

    static update(nom, ap, tel, dir, ref, email, dist, id) {
        return db.execute('UPDATE cliente SET nombre = ?, apellidos = ?, telefono = ?, direccion = ?, referenciaDomicilio = ?, correoElectronico = ?, idDistribucion = ? WHERE idCliente = ?',
            [nom, ap, tel, dir, ref, email, dist, id]
        );
    }


}