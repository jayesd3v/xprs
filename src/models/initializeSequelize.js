import { env, logger } from '@/utils';
import sequelize from '@/models/sequelize';

const {
    NODE_ENV,
    DB_DIALECT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE_NAME,
} = env;

const initializeSequelize = async ({
    alter = false,
    force = false,
    logging = false,
} = {}) => {
    try {
        sequelize.options.logging = logging
            ? (sql, timing) => {
                  logger.info(sql);
              }
            : false;

        await sequelize.authenticate();
        logger.info(
            `Database connection has been established successfully. ${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE_NAME}`,
        );

        if (NODE_ENV === 'prod' && (force || alter)) {
            logger.warn(
                'sequelize force and alter are not allowed in production',
            );
        }

        if (NODE_ENV !== 'prod') {
            await sequelize.sync({
                alter,
                force,
            });
        }

        sequelize.options.logging = false;
    } catch (e) {
        logger.error(e);
    }
};

export default initializeSequelize;
