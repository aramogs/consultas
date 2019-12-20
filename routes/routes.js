const express = require('express');
const router = express.Router();
const routesController = require('./routesController')

//Routes

router.get('/', routesController.index_GET);
router.get('/consulta_rackestampado', routesController.consulta_rackestampado_GET);
router.get('/consulta_bmw', routesController.consulta_BMW_GET);
router.get('/consulta_empleados', routesController.consulta_empleados_GET);
router.get('/consulta_ford', routesController.consulta_ford_GET);
router.get('/consulta_gm', routesController.consulta_gm_GET);
router.get('/consulta_vwmexico', routesController.consulta_vwmexico_GET);
router.get('/consulta_vulcanizado', routesController.consulta_vulcanizado_GET);
router.get('*', (req, res) => {
  res.send('404 Page not found');
});
module.exports = router;