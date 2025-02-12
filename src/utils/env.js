import 'dotenv/config';
import parse from 'dotenv-parse-variables';

const env = parse(process.env);

export default env;
