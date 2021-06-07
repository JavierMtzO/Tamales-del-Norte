const db = require('../util/database');

module.exports = class pedido {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(diaEntrega, estatus, descripcion, tipoDeEntrega, cantidadTotal, costoTotal) {
        this.diaEntrega = diaEntrega;
        this.estatus = estatus;
        this.descripcion = descripcion;
        this.tipoDeEntrega = tipoDeEntrega;
        this.cantidadTotal = cantidadTotal;
        this.costoTotal = costoTotal;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save(idPedido) {
        return db.execute('UPDATE pedido SET diaEntrega = ?, estatus = ?, descripcion = ?, tipoDeEntrega = ?, cantidadTotal = ?, costoTotal = ? WHERE idPedido = ?;',
            [this.diaEntrega, this.estatus, this.descripcion, this.tipoDeEntrega, this.cantidadTotal, this.costoTotal, idPedido]
        );
    }

    // static delete(idPedido) {
    //     return db.execute('DELETE FROM pedido WHERE idPedido = ?',
    //         [idPedido]
    //     );
    // }

    static delete(idPedido) {
        return db.execute('DELETE FROM pedido WHERE idPedido = ?',
            [idPedido])
            .then(() => {
                return db.execute('DELETE FROM pedidoproducto WHERE idPedido = ?',
                    [idPedido]);
            });
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM pedido WHERE costoTotal > 0');
    }
    static fetchOne(id) {
        return db.execute('SELECT * FROM cliente c, pedido pe, distribucion d WHERE c.idCliente = pe.idCliente AND d.idDistribucion = c.idDistribucion AND pe.idPedido = ?', [id]);
    }

    static savePedido(idPedido) {
        return db.execute('UPDATE pedido SET diaEntrega = ?, estatus = ?, descripcion = ?, tipoDeEntrega = ?, cantidadTotal = ?, costoTotal = ? WHERE idPedido = ?;',
            [this.diaEntrega, this.estatus, this.descripcion, this.tipoDeEntrega, this.cantidadTotal, this.costoTotal, idPedido]
        );
    }
    static saveStatus(estatus, idPedido) {
        return db.execute('UPDATE pedido SET estatus = ? WHERE idPedido = ?;',
            [estatus, idPedido]
        );
    }

    static fetchTotal() {
        return db.execute('SELECT SUM(costoTotal) FROM cliente c, pedido p WHERE p.idCliente = c.idCliente GROUP BY c.nombre');
    }


}