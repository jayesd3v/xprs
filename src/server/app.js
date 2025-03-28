import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import express from 'express';
import https from 'https';
import http from 'http';
import { env, logger } from '@/utils';
import {
    bodyParserMiddleware,
    errorMiddleware,
    getCorsMiddleware,
    routesMiddleware,
    sessionMiddleware,
} from '@/middlewares';

// Get the root path of the project
const { ROOT_PATH, NODE_ENV, DEBUG_PORT, HTTP_PORT, HTTPS_PORT } = env;

function App() {
    // Define paths for the key and certificate files
    const keyPath = resolve(ROOT_PATH, '/ssl/server.key');
    const certPath = resolve(ROOT_PATH, '/ssl/server.crt');

    // Check if both files exist
    const isHttps = existsSync(keyPath) && existsSync(certPath);

    // Create an Express app
    const expressApp = express()
        .use(getCorsMiddleware(isHttps))
        .use(sessionMiddleware)
        .use(bodyParserMiddleware)
        .use('/', routesMiddleware)
        .use(errorMiddleware);

    this.start = function () {
        if (isHttps) {
            // Read the key and certificate files
            const key = readFileSync(keyPath, 'utf8');
            const cert = readFileSync(certPath, 'utf8');

            // Create an HTTPS server
            const server = https.createServer({ key, cert }, expressApp);

            // Start the HTTPS server
            server.listen(HTTPS_PORT, () => {
                logger.info('HTTPS Server running on port 443');
            });
        } else {
            // Create an HTTP server
            const server = http.createServer(expressApp);
            const port = NODE_ENV === 'dev' ? DEBUG_PORT : HTTP_PORT;

            // Start the HTTP server
            server.listen(port, () => {
                logger.info(`HTTP Server running on port ${port}`);
            });
        }
    };
}

export default App;
