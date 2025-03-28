import { logger } from '@/utils';

const errorMiddleware = (err, req, res, next) => {
    logger.error(err.message);
};

export default errorMiddleware;
