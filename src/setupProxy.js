const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(proxy('/api', {
        target: 'http://localhost:8080/',
        // pathRewrite: {
        //     "^/api": "/"
        // }
        changeOrigin: true
    }));
    app.use(proxy('/admin', {
        target: 'http://localhost:8080/',
        // pathRewrite: {
        //     "^/admin": "/"
        // }
        changeOrigin: true
    }));
};