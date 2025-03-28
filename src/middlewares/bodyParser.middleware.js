import express from 'express';

const bodyParserMiddleware = express.json({
    verify: (req, res, buf) => {
        if (req.originalUrl === '/webhook/payment') {
            req.rawBody = buf.toString();
        }
    },
});

export default bodyParserMiddleware;
