import { env } from '@/utils';
import session from 'express-session';

const { SESSION_SECRET } = env;

const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        httpOnly: true,
        secure: true,
    },
});

export default sessionMiddleware;
