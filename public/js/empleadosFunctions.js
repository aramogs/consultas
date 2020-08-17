const funcionE = {};
const dbE = require('../db/connEmpleados');




funcionE.empleadosAll = ( callback) => {

    dbE(`SELECT * from del_empleados`, function (err, result, fields) {
        console.log(result,err);
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcionE.empleadosCorreo = (gafete, callback) => {

    dbE(`SELECT emp_correo from del_empleados WHERE emp_id= ${gafete}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result[0].emp_correo);
        }
    })

}

/*
funcionE.empleadosCorreoDep = (gafeteAcc, id_depE, callback) => {

    dbE(`SELECT emp_correo from del_empleados WHERE emp_id= ${gafeteAcc} AND emp_dep=${id_depE}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}
*/
funcionE.empleadosNombre = (gafete, callback) => {
    dbE(`SELECT emp_nombre FROM del_empleados WHERE emp_id=${gafete}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result[0].emp_nombre);
        }
    })

}

funcionE.empleadosTodos = (callback) => {

    dbE(`SELECT emp_correo FROM del_empleados ORDER BY emp_correo ASC`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcionE.empleadosTodosId = (callback) => {

    dbE(`SELECT emp_id FROM del_empleados ORDER BY emp_correo ASC`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcionE.empleadosAccessAll = (acc_andon, sign, callback) => {

    dbE(`SELECT acc_id FROM del_accesos WHERE acc_andon ${sign}${acc_andon}`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcionE.empleadosAccesos = (callback) => {

    dbE(`SELECT acc_id, acc_andon FROM del_accesos WHERE acc_andon>0`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {

            callback(null, result);
        }
    })

}

funcionE.empleadosInsertAcceso = (acc_id, acc_andon, callback) => {

    dbE(`INSERT INTO del_accesos (acc_id, acc_andon)
    VALUES('${acc_id}',${acc_andon})
    ON DUPLICATE KEY UPDATE acc_andon = VALUES(acc_andon)`, function (err, result, fields) {
            if (err) {

                callback(err, null);

            } else {

                callback(null, result);
            }
        })

}

funcionE.empleadosDeleteAcceso = (acc_id, callback) => {

    dbE(`UPDATE del_accesos SET acc_andon=0 WHERE acc_id=${acc_id}`, function (err, result, fields) {
            if (err) {

                callback(err, null);

            } else {

                callback(null, result);
            }
        })

}

module.exports = funcionE;