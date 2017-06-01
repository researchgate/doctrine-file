import test from 'ava';
import parseFile from '../parseFile';

function createTests(lineending) {
  test.cb(`Single line comments without options (${lineending})`, t => {
    t.plan(2);
    parseFile(`${__dirname}/data/singleline_${lineending}`, (err, comments) => {
      t.ifError(err);
      t.deepEqual(comments, [
        {
          description: '',
          tags: [
            {
              title: 'return',
              description: 'A return value',
              type: null,
            },
          ],
        },
      ]);
      t.end();
    });
  });

  test.cb(`Multi line comments without options (${lineending})`, t => {
    t.plan(2);
    parseFile(`${__dirname}/data/multiline_${lineending}`, (err, comments) => {
      t.ifError(err);
      t.deepEqual(comments, [
        {
          description: 'Description',
          tags: [
            {
              title: 'return',
              description: 'A return value',
              type: null,
            },
          ],
        },
      ]);
      t.end();
    });
  });

  test.cb(`Single line comments with options (${lineending})`, t => {
    t.plan(2);
    parseFile(
      `${__dirname}/data/singleline_${lineending}`,
      { lineNumbers: true },
      (err, comments) => {
        t.ifError(err);
        t.deepEqual(comments, [
          {
            description: '',
            tags: [
              {
                title: 'return',
                description: 'A return value',
                type: null,
                lineNumber: 0,
              },
            ],
          },
        ]);
        t.end();
      },
    );
  });

  test.cb(`Multi line comments with options (${lineending})`, t => {
    t.plan(2);
    parseFile(
      `${__dirname}/data/multiline_${lineending}`,
      { lineNumbers: true },
      (err, comments) => {
        t.ifError(err);
        t.deepEqual(comments, [
          {
            description: 'Description',
            tags: [
              {
                title: 'return',
                description: 'A return value',
                type: null,
                lineNumber: 2,
              },
            ],
          },
        ]);
        t.end();
      },
    );
  });
}

createTests('lf');
createTests('crlf');
