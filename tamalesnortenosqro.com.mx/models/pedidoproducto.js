const db = require('../util/database');

module.exports = class pedidoProducto {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(idProducto, idPedido, cantidadPorProducto) {
        this.idProducto = idProducto;
        this.idPedido = idPedido;
        this.cantidadPorProducto = cantidadPorProducto;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO pedidoproducto (idProducto, idPedido, cantidadPorProducto) VALUES (?, ?, ?)',
            [this.idProducto, this.idPedido, this.cantidadPorProducto]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM pedidoproducto');
    }

    static delete(id) {
        return db.execute('DELETE FROM pedidoproducto WHERE id = ?', [id]);
    }

}