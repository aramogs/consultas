const funcion = {};

const db = require('../db/conn_b10');
const db_b = require('../db/conn_bartender');



funcion.Search_etiquetas_semi = (callback) => {
    db.query(`SELECT * FROM etiquetas_semi_consulta WHERE 1`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}


funcion.Search_Tabla = (base,tabla,callback) => {
    if (base == "b10") {
        db.query(`SELECT * FROM ${tabla} WHERE 1`, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b.query(`SELECT * FROM ${tabla} WHERE 1`, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }
}


funcion.Search = (base, tabla, id, callback) => {
    if (base == "b10") {
        db.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }
}

funcion.Discover_Search = (base, tabla, callback) => {
    if (base == "b10") {
        db.query(`SHOW COLUMNS FROM ${tabla} `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b.query(`SHOW COLUMNS FROM ${tabla} `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

}


funcion.Update = (base, tabla, arreglo, id, callback) => {

    if (base == "b10") {
        db.query(`UPDATE ${tabla} SET ${arreglo} WHERE id = ${id} `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b.query(`UPDATE ${tabla} SET ${arreglo} WHERE id = ${id}`, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

}

funcion.Delete = (base, tabla, id, callback) => {

    if (base == "b10") {
        db.query(`DELETE FROM ${tabla} WHERE id = ${id} `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b.query(`DELETE FROM ${tabla} WHERE id = ${id}`, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

}

funcion.Search_Tables = (base,callback) => {
    db.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = '${base}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcion.Search_SAP_Union = (tables, base, callback) => {
    search_field = "no_sap"
    let search = []
    for (let i = 0; i < tables.length; i++) {

        search.push(`${search_field} FROM ${base}.${tables[i].table_name} UNION SELECT`)
        if (i == tables.length - 1) {

            search.push(`${search_field} FROM ${base}.${tables[i].table_name}`)
        }

    }

    if (base == "b10") {
        db.query(`SELECT ${search_field} FROM b10sap   `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
        }else{
            db_b.query(`SELECT ${search.join(" ")}   `, function (err, result, fields) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            })
    }
}


funcion.Insert = (base, tabla, titulos,valores, callback) => {

    if (base == "b10") {
        db.query(`INSERT INTO ${tabla} (${titulos}) VALUES (${valores}) `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b.query(`INSERT INTO ${tabla} (${titulos}) VALUES (${valores}) `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

}


module.exports = funcion;