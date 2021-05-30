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
    static fetchOne(id) {
        return db.execute('SELECT * FROM pedidoproducto p, cliente c, pedido pe, producto pr, distribucion d WHERE pe.idPedido = p.idPedido AND c.idCliente = pe.idCliente AND pr.idProducto = p.idProducto AND d.idDistribucion = c.idDistribucion AND pe.idPedido = ?', [id]);
    }
    static update(cantidad, idPedido, idProducto) {
        return db.execute('UPDATE pedidoproducto SET cantidadPorProducto = ? WHERE idPedido = ? AND idProducto = ?', [cantidad, idPedido, idProducto]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM pedidoproducto');
    }


    static delete(id) {
        return db.execute('DELETE FROM pedidoproducto WHERE id = ?', [id]);
    }

}