/* global describe, it */

import { expect, check } from 'chai';
import parseFile from '../parseFile';

describe('parseFile', () => {
  function test(lineending) {
    it(`Single line comments (${lineending})`, done => {
      parseFile(`${__dirname}/data/singleline_${lineending}`, (err, comments) => {
        if (err) done(err);
        check(done, () => {
          expect(err).to.be.null();
          expect(comments).to.be.instanceof(Array);
          expect(comments).to.have.length(1);
          expect(comments).to.deep.equal([{
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
      });
    });

    it(`Multi line comments (${lineending})`, done => {
      parseFile(`${__dirname}/data/multiline_${lineending}`, (err, comments) => {
        if (err) done(err);
        check(done, () => {
          expect(err).to.be.null();
          expect(comments).to.be.instanceof(Array);
          expect(comments).to.have.length(1);
          expect(comments).to.deep.equal([{
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
      });
    });
  }

  test('lf');
  test('crlf');
});
