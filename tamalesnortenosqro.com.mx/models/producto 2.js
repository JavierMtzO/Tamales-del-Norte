const db = require('../util/database');

module.exports = class nuevoProducto {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombreProducto, precio, existencia, descripcion, imagenProducto) {
        this.nombreProducto = nombreProducto;
        this.precio = precio;
        this.existencia = existencia;
        this.descripcion = descripcion;
        this.imagenProducto = imagenProducto;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO producto (nombreProducto, precio, existencia, descripcion, imagenProducto) VALUES (?, ?, ?, ?, ?)',
            [this.nombreProducto, this.precio, this.existencia, this.descripcion, this.imagenProducto]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM producto');
    }

}