const db = require('../util/database');

module.exports = class nuevaPromocion {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(descripcion, imagenPromocion) {
        this.descripcion = descripcion;
        this.imagenPromocion = imagenPromocion;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO promocion (descripcion, imagenPromocion) VALUES (?, ?)',
            [this.descripcion, this.imagenPromocion]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM promocion');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM promocion WHERE idPromocion = ?', [id]);
    }
    static update(descripcion, id) {
        return db.execute('UPDATE promocion SET descripcion = ? WHERE idPromocion = ?',
            [descripcion, id]
        );
    }
    static delete(id) {
        return db.execute('DELETE FROM promocion WHERE idPromocion = ?',
            [id]
        );
    }

}