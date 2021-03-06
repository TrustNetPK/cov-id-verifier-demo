const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const PORT = process.env.PORT || 5000;
const HOST_URL = process.env.REACT_APP_VERIFIER_HOST_URL || 'http://localhost:4000';

app.use(express.static(path.join(__dirname, 'build')));

app.use(
    '/connections',
    createProxyMiddleware({
        target: HOST_URL,
        changeOrigin: true,
    })
);

app.use(
    '/present-proof',
    createProxyMiddleware({
        target: HOST_URL,
        changeOrigin: true,
    })
);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);