const 
mongoose   = require('mongoose'),
Global     = require('../../global'),
production = Global.production,
url = (production) ? 'mongodb://eodigital:eodigital@ds137271.mlab.com:37271/mlab_eodigital' : 'mongodb://localhost/eodigital';

mongoose.connect(url);
// mongoose.connect('mongodb://localhost/eodigital');
// mongoose.connect('mongodb://francis:francis@ds031852.mlab.com:31852/mlab_fg');
// mongoose.connect('mongodb://eodigital:eodigital@ds137271.mlab.com:37271/mlab_eodigital');

module.exports = mongoose;