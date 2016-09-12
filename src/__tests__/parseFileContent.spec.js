import test from 'ava';
import fs from 'fs';
import parseFileContent from '../parseFileContent';

function createTests(lineending) {
  test(`Single line comments (${lineending})`, (t) => {
    const content = fs.readFileSync(`${__dirname}/data/singleline_${lineending}`);
    const comments = parseFileContent(content);

    t.deepEqual(comments, [{
      description: '',
      tags: [
        {
          title: 'return',
          description: 'A return value',
          type: null,
        },
      ],
    }]);
  });

  test(`Multi line comments (${lineending})`, (t) => {
    const content = fs.readFileSync(`${__dirname}/data/multiline_${lineending}`);
    const comments = parseFileContent(content);

    t.deepEqual(comments, [{
      description: 'Description',
      tags: [
        {
          title: 'return',
          description: 'A return value',
          type: null,
        },
      ],
    }]);
  });
}

createTests('lf');
createTests('crlf');
