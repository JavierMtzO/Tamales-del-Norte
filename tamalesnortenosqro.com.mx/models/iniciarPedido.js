const db = require('../util/database');

module.exports = class nuevoPedido {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(idCliente) {
        this.idCliente = idCliente;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO pedido(idCliente) VALUES(?)', [this.idCliente])
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchOne() {
        // return db.execute('SELECT * FROM pedido WHERE idPedido = ?', [thi]);
    }

}