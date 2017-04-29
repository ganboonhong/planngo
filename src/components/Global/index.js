const 
moment = require('moment-timezone'),
obj    = {
    // production: true,
    production: false,
    tz: 'Asia/Taipei',
    localDomain: 'http://127.0.0.1:9000',
    commonHint: 'Please check this field.',
    moment: moment,
    cookieLife: 60*1000,
}

obj.env = (obj.production) ? 'production' : 'development';

module.exports = obj;