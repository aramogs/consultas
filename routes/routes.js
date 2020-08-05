const express = require('express');
const router = express.Router();
const routesController = require('./routesController')
const multer = require('multer')
const upload = multer()

//Routes

router.get('/', routesController.index_GET);
router.get('/consulta_rackestampado', routesController.consulta_rackestampado_GET);
router.get('/consulta_bmw', routesController.consulta_BMW_GET);
router.get('/consulta_empleados', routesController.consulta_empleados_GET);
router.get('/consulta_ford', routesController.consulta_ford_GET);
router.get('/consulta_gm', routesController.consulta_gm_GET);
router.get('/consulta_vwmexico', routesController.consulta_vwmexico_GET);
router.get('/consulta_vulcanizado', routesController.consulta_vulcanizado_GET);
router.post('/actualizar',routesController.actualizar_POST);
router.post('/guardar',routesController.guardar_POST);
router.post('/eliminar',routesController.eliminar_POST);
router.post('/agregar',routesController.agregar_POST);
router.get('/consulta_sap_duplicado/:id', routesController.consulta_valor_unico_GET);
router.get('/consulta_emp_duplicado/:id', routesController.consulta_valor_unico_GET);
router.post('/insertar', routesController.insertar_POST);
router.post('/insertar_excel',  upload.single("excelFile"), routesController.insertar_excel_POST);
router.get('/consulta_vulca',routesController.consulta_vulca_GET);
router.get('*', (req, res) => {
  res.redirect('http://tftdelsrv001:3000/not_found');
});
module.exports = router;