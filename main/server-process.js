const http = require('http');
const authService = require('../services/auth-service');
const backendService = require('../services/backend-service');

const HOST = 'localhost';
const PORT = 8080;

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    switch (req.url) {
        case "/user":
            res.writeHead(200);
            // The userId is passed as the "sub" parameter of the Profile object. ex: "sub":"auth0|{USER_ID}"
            res.end(`${JSON.stringify(authService.getProfile())}`);
            break;
        case "/token":
            res.writeHead(200);
            res.end(`${JSON.stringify(authService.getAccessToken())}`);
            break;
        case "/arduino":
            res.writeHead(200);
            backendService.getArduinoData().then((response) => {
                res.end(`${JSON.stringify(response)}`);
            });
            break;
        default:
            res.writeHead(404);
            res.end('404 Not Found');
            break;
    }

}

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

/*
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});*/
