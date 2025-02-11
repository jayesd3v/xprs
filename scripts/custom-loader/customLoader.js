import path from 'path';

const ROOT_PATH = new URL(path.dirname(import.meta.url) + '/src').pathname;

// this help project to resolve the path from src folder instead of root, then we can import with the relative path from src folder
export function resolve(specifier, parentModuleURL, defaultResolver) {
    specifier = specifier.replace(/^@/, ROOT_PATH);
    return defaultResolver(specifier, parentModuleURL);
}
