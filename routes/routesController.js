//Conexion a base de datos
const controller = {};

//Require Funciones
const funcion = require('../public/js/controllerFunctions');


//Require ExcelJs
const Excel = require('exceljs');
// Index GET
controller.index_GET = (req, res) => {
    res.render('index.ejs');

};

//Prueba Commitizen

function acceso(req) {
    let acceso = []

       

    for (let i = 0; i < req.connection.userGroups.length; i++) {
        if (req.connection.userGroups[i].toString() == 'TFT\\TFT.DEL.PAGES_Consultas_Logistica') {
            acceso.push("logistica")
        } else if (req.connection.userGroups[i].toString() == 'TFT\\TFT.DEL.PAGES_Consultas_Produccion') {
            acceso.push("produccion")
        }
    }
    return (acceso)
}

controller.consulta_rackestampado_GET = (req, res) => {

    base = "b10";
    tabla = "etiquetas_semi_consulta";
    funcion.Search_Tabla(base, tabla, (err, etiquetas_info) => {
        res.render('consulta_rackestampado.ejs', {
            etiquetas_info,
            base,
            tabla
        });

    });

};

controller.consulta_vulcanizado_GET = (req, res) => {
    base = "b10_bartender";
    tabla = "vulc_consulta";
    funcion.Search_Tabla(base, tabla, (err, etiquetas_info) => {
        res.render('consulta_base.ejs', {
            etiquetas_info,
            base,
            tabla
        });

    });
};

controller.consulta_BMW_GET = (req, res) => {
    base = "b10";
    tabla = "b10sap";
    funcion.Search_Tabla(base, tabla, (err, etiquetas_info) => {
        res.render('consulta_base.ejs', {
            etiquetas_info,
            base,
            tabla
        });

    });
};


controller.consulta_empleados_GET = (req, res) => {
    base = "b10";
    tabla = "empleados";
    funcion.Search_Tabla(base, tabla, (err, etiquetas_info) => {
        res.render('consulta_base.ejs', {
            etiquetas_info,
            base,
            tabla
        });

    });
};

controller.consulta_ford_GET = (req, res) => {
    base = "b10_bartender";
    tabla = "ford";
    funcion.Search_Tabla(base, tabla, (err, etiquetas_info) => {
        res.render('consulta_base.ejs', {
            etiquetas_info,
            base,
            tabla
        });
    });
};

controller.consulta_gm_GET = (req, res) => {
    base = "b10_bartender";
    tabla = "gm";
    funcion.Search_Tabla(base, tabla, (err, etiquetas_info) => {
        res.render('consulta_base.ejs', {
            etiquetas_info,
            base,
            tabla
        });
    });
};

controller.consulta_vwmexico_GET = (req, res) => {
    base = "b10_bartender";
    tabla = "vwmexico";
    funcion.Search_Tabla(base, tabla, (err, etiquetas_info) => {
        res.render('consulta_base.ejs', {
            etiquetas_info,
            base,
            tabla
        });
    });
};

controller.actualizar_POST = (req, res) => {

    ids = (req.body.id).split(",");
    id = ids[0];
    base = ids[1];
    tabla = ids[2];
    origen = req.body.origen[0]

    if ((acceso(req,res)).includes("logistica") && tabla != "vulc_consulta" || (acceso(req,res)).includes("produccion") && tabla == "vulc_consulta") {

        funcion.Search(base, tabla, id, (err, valores) => {
            funcion.Discover_Search(base, tabla, (err, formato) => {
                res.render("actualizar.ejs", {
                    valores,
                    formato,
                    base,
                    tabla,
                    origen
                });
            });
        });
    } else {
        res.render("acceso_denegado.ejs")
    }

};


controller.guardar_POST = (req, res) => {

    let obj = req.body;
    base = req.body.base;
    tabla = req.body.tabla;
    id = req.body.id;
    arreglo = [];
    origen = req.body.origen
    funcion.Discover_Search(base, tabla, (err, formato) => {

        let info = Object.entries(obj);

        for (let i = 0; i < formato.length; i++) {
            for (let y = 0; y < info.length; y++) {
                if (formato[i].Field == info[y][0]) {
                    if ((formato[i].Type).substring(0, 3) == "int") {
                        arreglo.push(`\`${info[y][0]}\`=${info[y][1]}`);
                    } else if ((formato[i].Type).substring(0, 7) == "varchar") {
                        arreglo.push(`\`${info[y][0]}\`="${info[y][1]}"`);
                    }
                }
            }
        }
        arregloFinal = arreglo.join();
        funcion.Update(base, tabla, arregloFinal, id, (err, result) => {
            res.render('guardado.ejs', {
                arreglo,
                id,
                estado: "update",
                origen
            });
        });
    });

};

controller.eliminar_POST = (req, res) => {

    ids = (req.body.id).split(",");
    id = ids[0];
    base = ids[1];
    tabla = ids[2];
    let origen =req.body.origen[0]

    if ((acceso(req,res)).includes("logistica") && tabla != "vulc_consulta" || (acceso(req,res)).includes("produccion") && tabla == "vulc_consulta") {
        funcion.Delete(base, tabla, id, (err, result) => {
            res.render('eliminado.ejs', {
                id,
                origen
            });
        });
    } else {
        res.render("acceso_denegado.ejs")
    }
}


controller.agregar_POST = (req, res) => {

    ids = (req.body.id).split(",");
    base = ids[0];
    tabla = ids[1];

    if ((acceso(req,res)).includes("logistica") && tabla != "vulc_consulta" || (acceso(req,res)).includes("produccion") && tabla == "vulc_consulta") {

        if (tabla == "vulc_consulta") {
            tabla = "vulc";
        }

        funcion.Discover_Search(base, tabla, (err, formato) => {
            formato = Object.assign({}, formato);
            res.render("insertar.ejs", {
                formato,
                base,
                tabla
            });
        });
    } else {
        res.render("acceso_denegado.ejs")
    }
}

controller.consulta_valor_unico_GET = (req, res) => {


    if (req.url.split("/")[1] == "consulta_sap_duplicado") {
        search_field = "no_sap"
    } else if (req.url.split("/")[1] == "consulta_emp_duplicado") {
        search_field = "emp_tag"
    }


    base = req.params.id;
    funcion.Search_Tables(base, (err, tables) => {

        funcion.Search_SAP_Union(tables, base, search_field, (err, valoresUnicos) => {
            res.send(valoresUnicos);
        });
    });
};

controller.insertar_POST = (req, res) => {
    obj = req.body;
    base = req.body.base;
    tabla = req.body.tabla;
    origen = req.body.origen
    arreglo = [];
    titulos = [];
    valores = [];


    funcion.Discover_Search(base, tabla, (err, formato) => {

        let info = Object.entries(obj);
        for (let i = 1; i < formato.length; i++) {
            for (let y = 0; y < info.length; y++) {
                if (formato[i].Field == info[y][0]) {
                    if ((formato[i].Type).substring(0, 3) == "int") {
                        arreglo.push(`${info[y][0]}=${info[y][1]}`);
                        titulos.push(`\`${info[y][0]}\``);
                        valores.push(`${info[y][1]}`);

                    } else if ((formato[i].Type).substring(0, 7) == "varchar") {
                        arreglo.push(`${info[y][0]}="${info[y][1]}"`);
                        titulos.push(`\`${info[y][0]}\``);
                        valores.push(`"${info[y][1]}"`);
                    }
                }
            }
        }

        titulosFinales = titulos.join();
        valoresFinales = valores.join();
        funcion.Insert(base, tabla, titulosFinales, valoresFinales, (err, result) => {
            id = result.insertId;

            res.render('guardado.ejs', {
                arreglo,
                id,
                estado: "insert",
                origen
            });
        });
    });
};


controller.insertar_excel_POST = (req, res) => {

    let obj = req.body;
    let base = req.body.base;
    let tabla = req.body.tabla;


    let arreglo = [];
    let titulos = [];
    let titulos2 = [];
    let valores = [];
    let no_sap = [];
    let no_sap2;
    let count = 0;
    const wb = new Excel.Workbook();

    funcion.Discover_Search(base, tabla, (err, formato) => {

        wb.xlsx.load(req.file.buffer)
            .then(() => {
                worksheet = wb.worksheets[0]
                worksheet.eachRow(function (row, rowNumber) {
                    val = row.values
                    for (let i = 0; i < val.length; i++) {
                        if (val[i] === undefined) {
                            val[i] = " "
                        }

                    }
                    arreglo.push(val)
                });
            })
            .then(() => {
                for (let i = 0; i < arreglo.length; i++) {
                    arreglo[i].shift()
                }
                for (let i = 0; i < arreglo[0].length; i++) {
                    titulos.push(`\`${arreglo[0][i]}\``)
                    titulos2.push((arreglo[0][i]).toLowerCase())
                }
            })
            .then(() => {
                    if (formato.length == titulos2.length) {
                        for (let i = 0; i < titulos2.length; i++) {

                            if (titulos2.includes(formato[i].Field)) {count++}
                        }

                        if (formato.length != count) {
                            res.render('guardado_excel.ejs', {
                                arreglo,
                                estado: "Error",
                                mensaje: "Titulos del documento no coinciden con la base de datos",
                                id:[base,tabla]
                            });
                        } else {

                            for (let i = 0; i < titulos2.length; i++) {
                                if (titulos2[i] == "no_sap") { 
                                    no_sap2 = i 
                                }
                            }
                            for (let i = 0; i < arreglo.length; i++) {
                                no_sap.push((arreglo[i][no_sap2]).toUpperCase())
                            }
                            let unique = [...new Set(no_sap)];
                            for (let i = 1; i < arreglo.length; i++) {

                                if ((arreglo[i][no_sap2]).toUpperCase().startsWith("P")) {
                                    valores.push(arreglo[i])
                                }else{
                                    arreglo[i][no_sap2] = "P"+arreglo[i][no_sap2]
                                    valores.push(arreglo[i])
                                    
                                }

                                
                            }

                            if (no_sap.length != unique.length) {
                                res.render('guardado_excel.ejs', {
                                    arreglo,
                                    estado: "Error",
                                    mensaje: "Numero de SAP duplicado verifique su informacion",
                                    id:[base,tabla]
                                });
                            }else{
                                funcion.Insert_excel(base, tabla, titulos, valores, (err, result) => { })
                                res.render('guardado_excel.ejs', {
                                    arreglo,
                                    estado: "OK",
                                    mensaje: "",
                                    id:[base,tabla]
                                });
                            }

                        }
                    } else {
                        res.render('guardado_excel.ejs', {
                            arreglo,
                            estado: "Error",
                            mensaje: "Columnas del documento no coinciden con la base de datos",
                            id:[base,tabla]
                        });
                    }
            })
    })
}

controller.consulta_vulca_GET = (req, res) => {
    funcion.Search_etiquetas_semi((err, base) => {
        res.render("consulta_vulca.ejs", {
            base
        })

    })
}

module.exports = controller;