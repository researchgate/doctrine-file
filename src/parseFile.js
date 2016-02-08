/* @flow */
/* eslint-disable no-param-reassign */
import fs from 'fs';
import Extractor from './Extractor';

export default (file: string, opts: ?DoctrineOptions, callback: Function): void => {
  if (!callback && typeof opts === 'function') {
    callback = opts;
    opts = null;
  }

  const collected = [];
  fs.createReadStream(file, { encoding: 'utf8' })
    .on('error', callback)
    // $FlowIssue This is correct
    .pipe(new Extractor(opts))
    .on('error', callback)
    .on('data', data => collected.push(data))
    .on('finish', () => callback(null, collected));
};
