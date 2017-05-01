const 
moment = require('moment-timezone'),
obj    = {
    production: (process.env.NODE_ENV === 'development') ? false : true,
    // production: false,
    tz: 'Asia/Taipei',
    localDomain: 'http://127.0.0.1:9000',
    localReactDomain: 'http://127.0.0.1:3000',
    commonHint: 'Please check this field.',
    moment: moment,
    cookieLife: 60*1000,
}

obj.env = (obj.production) ? 'production' : 'development';
obj.ajaxLoaderGiF = (obj.production) ?  '/ajax-loader.gif' : obj.localReactDomain + '/ajax-loader.gif';

module.exports = obj;