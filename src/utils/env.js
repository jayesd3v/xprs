import 'dotenv/config';
import parse from 'dotenv-parse-variables';

const env = parse(process.env);
env.ROOT_PATH = process.cwd();

export default env;
