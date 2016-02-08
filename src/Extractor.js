/* @flow */
import { parse } from 'doctrine';
import { Transform } from 'stream';

const jsdoc = {
  singleLine: /^\s*(\/\*{2}\s*.*\s*\*\/)\s*$/,
  start: /^\s*\/\*{2}\s*$/,
  line: /^\s*\*\s*.*$/,
  end: /^\s*\*\/\s*$/,
};

export default class Extractor extends Transform {

  unfinishedChunk: Array<string> = [];
  opts: ?DoctrineOptions = {};

  constructor(opts: ?DoctrineOptions = {}) {
    super({ objectMode: true });
    this.opts = opts;
  }

  _consumeLine(line: string): ?CommentObject {
    const match = line.match(jsdoc.singleLine);
    if (match) {
      // singleline
      return this._addDoc(match[1]);
    } else if (line.match(jsdoc.start)) {
      // start multiline
      this.unfinishedChunk = [line];
    } else if (this.unfinishedChunk.length) {
      if (line.match(jsdoc.end)) {
        // end multiline
        const comment = this._addDoc([...this.unfinishedChunk, line].join('\n'));
        this.unfinishedChunk = [];

        return comment;
      } else if (line.match(jsdoc.line)) {
        // line multiline
        this.unfinishedChunk.push(line);
      } else {
        // invalid line inbetween jsdoc
        this.unfinishedChunk = [];
      }
    }
  }

  _addDoc(docBlock: string): CommentObject {
    const comment = parse(docBlock, { ...this.opts, unwrap: true });
    // $FlowIssue This is correct as objectMode === true
    this.push(comment);

    return comment;
  }

  _transform(chunk: string, encoding: string, callback: Function): void {
    const lines = chunk.toString().split(/\n/);

    while (lines.length) {
      this._consumeLine(lines.shift());
    }

    callback();
  }

  extract(content: string): Array<CommentObject> {
    const comments = [];
    const lines = content.toString().split(/\n/);

    while (lines.length) {
      const comment = this._consumeLine(lines.shift());
      if (comment) comments.push(comment);
    }

    return comments;
  }
}
