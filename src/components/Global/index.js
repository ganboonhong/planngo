var 
moment = require('moment'),
obj    = {
    production: (process.env.NODE_ENV === 'development') ? false : true,
    // production: false,
    // tz: 'Asia/Taipei',
    localDomain: 'http://127.0.0.1:9000',
    localReactDomain: 'http://127.0.0.1:3000',
    commonHint: 'Please check this field.',
    moment: moment,
    cookieLife: 60*1000,
}
var currentUrl = window.location.href.replace('https', 'http');
var lastSlashIndex = currentUrl.lastIndexOf('/');
currentUrl = currentUrl.slice(0, lastSlashIndex) + ':9000' + currentUrl.slice(lastSlashIndex);

obj.productionDomain = currentUrl;
obj.env              = (obj.production) ? 'production' : 'development';
obj.ajaxLoaderGiF    = (obj.production) ?  '/assets/ajax-loader.gif' : obj.localReactDomain + '/assets/ajax-loader.gif';

module.exports = obj;