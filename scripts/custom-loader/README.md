# Custom Loader

Support relative import, folder import and implicitly js extension file import

## Usage

Add node param `--import ./scripts/custom-loader/register.js` when running your application

```
$ node --import ./scripts/custom-loader/register.js ./src/index.js
```

## Debugging

import directory:

```
$ node debug.js @/utils
```

import js file without extension:

```
$ node debug.js @/utils/env
```

## Problem

On Windows, `lstatSync` won't work with path scheme like `file:///` so when checking the path, we need to remove it out