const barangRoutes = require('express').Router();
const barangControllers = require('../controllers/barangController');
const authMiddleware = require('../helpers/authMiddleware');


// barangRoutes.get('/',authMiddleware.checkLogin, barangControllers.getAllBarang);
barangRoutes.get('/', barangControllers.getAllBarang);
barangRoutes.get('/:id',barangControllers.getBarangBy);
barangRoutes.post('/', barangControllers.createNewBarang);
barangRoutes.put('/:id', barangControllers.updateBarang);
barangRoutes.delete('/:id', barangControllers.deleteBarang);

module.exports = barangRoutes;