/* global describe, it */

import { expect } from 'chai';
import fs from 'fs';
import parseFileContent from '../parseFileContent';

describe('parseFileContent', () => {
  function test(lineending) {
    it(`Single line comments (${lineending})`, () => {
      const content = fs.readFileSync(`${__dirname}/data/singleline_${lineending}`);
      const comments = parseFileContent(content);
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

    it(`Multi line comments (${lineending})`, () => {
      const content = fs.readFileSync(`${__dirname}/data/multiline_${lineending}`);
      const comments = parseFileContent(content);
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
  }

  test('lf');
  test('crlf');
});
