# Doctrine-File
###### File-Reader for the [Doctrine][1] JSDoc Parser

[![Build Status](https://travis-ci.org/researchgate/doctrine-file.svg?branch=master)](https://travis-ci.org/researchgate/doctrine-file)

## Installation

You can install Doctrine-File using [npm](https://www.npmjs.com/package/doctrine-file):

```
$ npm install doctrine-file --save-dev
```

## Usage

Import doctrine-File inside of your JavaScript:

```js
import { parseFile } from 'doctrine-file';
```

### parseFile(file[, options], callback)

* `file` String PathName to a textfile
* `options` Object
    * All options that [doctrine.parse][1] supports, except unwrap which can't be changed.
* `callback` Function

The callback is passed two arguments `(err, comments)`, where `comments` is an array of doctrine results.
If no JSDocs can be extracted from the file, the array will be empty.
When the file cannot be read `err` will contain the `Error`.

Here's a simple example:

```js
parseFile('somefile.js', (err, comments) => {
  if (err) throw err;

  for (let comment of comments) {
    console.log(comment)
  }
});
```

### parseFileContent(content[, options])

* `content` String | Buffer Content of a complete file to be parsed
* `options` Object
    * All options that [doctrine.parse][1] supports, except unwrap which can't be changed.

When the file cannot be read an `Error` will be thrown.

Here's a simple example:

```js
const content = fs.readFileSync('somefile.js', 'utf-8');

const comments = parseFileContent(content);

for (let comment of comments) {
  console.log(comment)
}
```

## License

doctrine-file is licensed under the MIT license.

[1]: https://github.com/eslint/doctrine#readme
