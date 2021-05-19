const db = require('../util/database');

module.exports = class nuevaDistribucion {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(diaDeEntrega, nombreDeColonia, horaInicioEntrega, horaFinalEntrega) {
        this.diaDeEntrega = diaDeEntrega;
        this.nombreDeColonia = nombreDeColonia;
        this.horaInicioEntrega = horaInicioEntrega;
        this.horaFinalEntrega = horaFinalEntrega;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO distribucion (diaDeEntrega, nombreDeColonia, horaInicioEntrega, horaFinalEntrega) VALUES (?, ?, ?, ?)',
            [this.diaDeEntrega, this.nombreDeColonia, this.horaInicioEntrega, this.horaFinalEntrega]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM distribucion');
    }

}