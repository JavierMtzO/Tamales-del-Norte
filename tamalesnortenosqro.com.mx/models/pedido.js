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

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM producto');
    }
    static savePedido(idPedido) {
        return db.execute('UPDATE pedido SET diaEntrega = ?, estatus = ?, descripcion = ?, tipoDeEntrega = ?, cantidadTotal = ?, costoTotal = ? WHERE idPedido = ?;',
            [this.diaEntrega, this.estatus, this.descripcion, this.tipoDeEntrega, this.cantidadTotal, this.costoTotal, idPedido]
        );
    }

}