const mainRoutes = require('express').Router();
const barangRoutes = require("./barangRoutes");
const authRoutes = require('./authRoutes')

mainRoutes.use('/barang', barangRoutes);
mainRoutes.use('/auth',authRoutes);

module.exports= mainRoutes;