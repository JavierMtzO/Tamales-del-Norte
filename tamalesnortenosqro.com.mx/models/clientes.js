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

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM cliente');
    }
    static fetchOne(email) {
        return db.execute('SELECT * FROM cliente WHERE correoElectronico = ?', [email]);
    }
    static login(correoElectronico, password) {
        return db.execute('SELECT * FROM cliente WHERE ');
    }

}