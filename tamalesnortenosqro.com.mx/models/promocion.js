const db = require('../util/database');

module.exports = class nuevaPromocion {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(descripcion, fechaInicio, horaFinalEntrega, imagenPromocion) {
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.horaFinalEntrega = horaFinalEntrega;
        this.imagenPromocion = imagenPromocion;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO promocion (descripcion, fechaInicio, horaFinalEntrega, imagenPromocion) VALUES (?, ?, ?, ?)',
            [this.descripcion, this.fechaInicio, this.horaFinalEntrega, this.imagenPromocion]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM promocion');
    }

}