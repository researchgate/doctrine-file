/* global describe, it */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import fs from 'fs';
import parseFileContent from '../parseFileContent';

describe('parseFileContent', () => {
  it('Single line comments', () => {
    const content = fs.readFileSync(`${__dirname}/data/singleline`);
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

  it('Multi line comments', () => {
    const content = fs.readFileSync(`${__dirname}/data/multiline`);
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
});
