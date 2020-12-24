const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy.createProxyMiddleware('/api-storage/', {
    target: 'https://breadth.app/api-storage/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api-storage": "/"
    },
  }));
};


// "proxy": {
//   "/api-storage/**": {
//     "target": "https://breadth.app/api-storage/",
//       "changeOrigin": true
//   }
// }
