const funcion = {};

const db = require('../db/conn_b10');
const db_b = require('../db/conn_bartender');



funcion.Search_etiquetas_semi = (callback) => {
    db(`SELECT * FROM etiquetas_semi_consulta WHERE 1`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}


funcion.Search_Tabla = (base, tabla, callback) => {
    if (base == "b10") {
        db(`SELECT * FROM ${tabla} WHERE 1`, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b(`SELECT * FROM ${tabla} WHERE 1`, function (err, result, fields) {
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
        db(`SELECT * FROM ${tabla} WHERE id = ${id}`, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b(`SELECT * FROM ${tabla} WHERE id = ${id}`, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }
}

funcion.Discover_Search = (base, tabla, callback) => {
    if (tabla === "vulc") {
        tabla = "vulc_consulta"
    }
    if (base == "b10") {
        db(`SHOW COLUMNS FROM ${tabla} `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b(`SHOW COLUMNS FROM ${tabla} `, function (err, result, fields) {
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
        db(`UPDATE ${tabla} SET ${arreglo} WHERE id = ${id} `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b(`UPDATE ${tabla} SET ${arreglo} WHERE id = ${id}`, function (err, result, fields) {
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
        db(`DELETE FROM ${tabla} WHERE id = ${id} `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b(`DELETE FROM ${tabla} WHERE id = ${id}`, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

}

funcion.Search_Tables = (base, callback) => {
    db(`SELECT table_name FROM information_schema.tables WHERE table_schema = '${base}'`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcion.Search_SAP_Union = (tables, base, search_field, callback) => {

    let search = []
    for (let i = 0; i < tables.length; i++) {

        search.push(`${search_field} FROM ${base}.${tables[i].table_name} UNION SELECT`)
        if (i == tables.length - 1) {

            search.push(`${search_field} FROM ${base}.${tables[i].table_name}`)
        }

    }

    if (base == "b10" && search_field == "no_sap") {
        db(`SELECT ${search_field} FROM b10sap   `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else if (base == "b10" && search_field == "emp_tag") {
        db(`SELECT ${search_field} FROM empleados   `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b(`SELECT ${search.join(" ")}   `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }
}


funcion.Insert = (base, tabla, titulos, valores, callback) => {

    if (base == "b10") {
        db(`INSERT INTO ${tabla} (${titulos}) VALUES (${valores}) `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    } else {
        db_b(`INSERT INTO ${tabla} (${titulos}) VALUES (${valores}) `, function (err, result, fields) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

}


funcion.Insert_excel = (base, tabla, titulos, valores, callback) => {

    let valor
    let = valores_finales = []
    let duplicate = []

    for (let i = 0; i < valores.length; i++) {
        valores_finales = []
        duplicate = []
        for (let y = 0; y < titulos.length; y++) {

            if (typeof (valores[i][y]) === "string") {
                valor = `"${valores[i][y]}"`
            } else if (typeof (valores[i][y])) {
                valor = valores[i][y]
            } else if (valores[i][y] === undefined) {
                valor = " "
            } else {
                valor = valores[i][y]
            }
            valores_finales.push(valor)
            duplicate.push(`${titulos[y]}=${valor}`)
        }  
        if (base == "b10") {
            db(`INSERT INTO ${tabla} (${titulos.join()}) VALUES (${valores_finales}) ON DUPLICATE KEY UPDATE ${duplicate}  `, function (err, result, fields) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            })
        } else {
            db_b(`INSERT INTO ${tabla} (${titulos.join()}) VALUES (${valores_finales}) ON DUPLICATE KEY UPDATE ${duplicate}  `, function (err, result, fields) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            })
        }
    }
}

module.exports = funcion;