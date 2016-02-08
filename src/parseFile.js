/* @flow */
/* eslint-disable no-param-reassign */
import fs from 'fs';
import Extractor from './Extractor';

export default (file: string, options: ?DoctrineOptions, callback: Function): void => {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }

  const collected = [];
  fs.createReadStream(file, { encoding: 'utf8' })
    .on('error', callback)
    // $FlowIssue This is correct
    .pipe(new Extractor(options))
    .on('error', callback)
    .on('data', data => collected.push(data))
    .on('finish', () => callback(null, collected));
};
