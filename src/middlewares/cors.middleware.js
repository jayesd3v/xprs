import { env, logger } from '@/utils';
import cors from 'cors';

const { HOST, HTTP_PORT, HTTPS_PORT, DEBUG_PORT, NODE_ENV, ORIGIN } = env;

const getCorsMiddleware = (isHttps) => {
    let origin;

    if (ORIGIN) {
        origin = ORIGIN.split(',');
    } else {
        if (isHttps) {
            origin = [`https://${HOST}:${HTTPS_PORT}`];
        } else {
            origin =
                NODE_ENV === 'dev'
                    ? [`http://${HOST}:${DEBUG_PORT}`]
                    : [`http://${HOST}:${HTTP_PORT}`];
        }
    }

    logger.info(`origin: [${origin}]`);

    return cors({
        origin,
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
        credentials: true,
    });
};

export default getCorsMiddleware;
