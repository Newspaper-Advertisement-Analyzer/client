const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Specify the API endpoints you want to proxy
    createProxyMiddleware({
      target: "http://localhost:5000", // Replace with your local Flask server's URL
      changeOrigin: true,
    })
  );
};
