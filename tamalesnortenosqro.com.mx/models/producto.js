const db = require('../util/database');

module.exports = class nuevoProducto {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombreProducto, precio, descripcion, imagenProducto) {
        this.nombreProducto = nombreProducto;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagenProducto = imagenProducto;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO producto (nombreProducto, precio, descripcion, imagenProducto) VALUES (?, ?, ?, ?)',
            [this.nombreProducto, this.precio, this.descripcion, this.imagenProducto]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM producto');
    }
    static fetchAllProductos() {
        return db.execute('SELECT SUM(ped.cantidadPorProducto) as ventas, p.nombreProducto, p.descripcion, p.precio, p.idProducto FROM producto p, pedidoproducto ped WHERE p.idProducto = ped.idProducto AND ped.fechaPedido > (NOW() - INTERVAL 1 MONTH) GROUP BY p.nombreProducto, p.descripcion, p.precio, p.idProducto');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM producto WHERE idProducto = ?', [id]);
    }

    static update(nombre, descripcion, precio, id) {
        return db.execute('UPDATE producto SET nombreProducto = ?, descripcion = ?, precio = ? WHERE idProducto = ?',
            [nombre, descripcion, precio, id]
        );
    }

    static delete(idProducto) {
        return db.execute('DELETE FROM producto WHERE idProducto = ?',
            [idProducto]
        );
    }


}