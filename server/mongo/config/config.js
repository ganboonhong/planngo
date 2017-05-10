const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eodigital');

module.exports = mongoose;