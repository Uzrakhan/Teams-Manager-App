// server.js

const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = 3001;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'accept-encoding']
}).listen(port, host, () => {
    console.log(`CORS Anywhere server running on http://${host}:${port}`);
});
