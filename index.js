const corsAnywhere = require('cors-anywhere');

// Create the CORS server
const server = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins (no restrictions)
  checkRequest: (req, res) => {
    // This function can be customized to check the request, but we leave it simple.
    return true; // Allow all requests
  },
  removeHeaders: ['cookie', 'cookie2'],
});

// Start the server
const port = 3001;
server.listen(port, 'localhost', () => {
  console.log(`CORS Anywhere server running on http://localhost:${port}`);
});
