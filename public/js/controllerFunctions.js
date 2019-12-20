const funcion = {};
const express = require('express');


const db = require('../db/conn_b10');
const db_b = require('../db/conn_bartender');


funcion.Discover_B10 = (callback)=>{
    db.query(`SHOW COLUMNS FROM etiquetas_semi_consulta`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcion.Search_B10_etiquetas_semi =(callback)=>{
    db.query(`SELECT * FROM etiquetas_semi_consulta`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}


funcion.Search_B10_BMW =(callback)=>{
    db.query(`SELECT * FROM b10sap`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcion.Search_Empleados =(callback)=>{
    db.query(`SELECT * FROM empleados`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcion.Search_Ford =(callback)=>{
    db_b.query(`SELECT * FROM ford`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcion.Search_Gm =(callback)=>{
    db_b.query(`SELECT * FROM gm`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcion.Search_VWMexico =(callback)=>{
    db_b.query(`SELECT * FROM vwmexico`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

funcion.Search_Vulcanizado =(callback)=>{
    db_b.query(`SELECT * FROM vulc_consulta`, function (err, result, fields) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

module.exports = funcion;