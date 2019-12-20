//Conexion a base de datos
const db = require('../public/db/conn_b10');
const controller = {};

//Require Funciones
const funcion = require('../public/js/controllerFunctions');


// Index GET
controller.index_GET = (req, res) => {
    res.render('index.ejs');

};

//GET Crear andon
controller.crear_andon_GET = (req, res) => {
    res.render('login.ejs');
};

controller.consulta_rackestampado_GET = (req, res) => {

    funcion.Search_B10_etiquetas_semi((err, etiquetas_semi) => {
        res.render('consulta_rackestampado.ejs', {
            etiquetas_semi
        })

    })

};

controller.consulta_vulcanizado_GET = (req, res) => {
    funcion.Search_Vulcanizado((err, etiquetas_vulcanizado) => {
        res.render('consulta_vulcanizado.ejs', {
            etiquetas_vulcanizado
        })

    })
};

controller.consulta_BMW_GET = (req, res) => {
    funcion.Search_B10_BMW((err, etiquetas_bmw) => {
        res.render('consulta_bmw.ejs', {
            etiquetas_bmw
        })

    })
};

controller.consulta_BMW_GET = (req, res) => {
    funcion.Search_B10_BMW((err, etiquetas_bmw) => {
        res.render('consulta_bmw.ejs', {
            etiquetas_bmw
        })

    })
};

controller.consulta_empleados_GET = (req, res) => {
    funcion.Search_Empleados((err, etiquetas_empleados) => {
        res.render('consulta_empleados.ejs', {
            etiquetas_empleados
        })

    })
};

controller.consulta_ford_GET = (req, res) => {
    funcion.Search_Ford((err, etiquetas_ford) => {
        res.render('consulta_ford.ejs', {
            etiquetas_ford
        })

    })
};

controller.consulta_gm_GET = (req, res) => {
    funcion.Search_Gm((err, etiquetas_gm) => {
        res.render('consulta_gm.ejs', {
            etiquetas_gm
        })

    })
};

controller.consulta_vwmexico_GET = (req, res) => {
    funcion.Search_VWMexico((err, etiquetas_vwmexico) => {
        res.render('consulta_vwmexico.ejs', {
            etiquetas_vwmexico
        })

    })
};

module.exports = controller;