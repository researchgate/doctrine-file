/* @flow */
import { parse } from 'doctrine';
import { Transform } from 'stream';

const jsdoc = {
    singleLine: /^\s*(\/\*{2}.*\*\/)\s*$/,
    start: /^\s*\/\*{2}\s*$/,
    line: /^\s*\*.*$/,
    end: /^\s*\*\/\s*$/,
};

export default class Extractor extends Transform {
    unfinishedChunk: Array<string> = [];
    opts: ?DoctrineOptions = {};

    constructor(opts: ?DoctrineOptions = {}) {
        super({ objectMode: true });
        this.opts = opts;
    }

    resetChunk(): void {
        this.unfinishedChunk = [];
    }

    addLine(line: string, reset: boolean = false): void {
        if (reset) this.resetChunk();
        this.unfinishedChunk.push(line);
    }

    getRawCommentAndReset(): string {
        const comment = this.unfinishedChunk.join('\n');
        this.resetChunk();

        return comment;
    }

    consumeLine(line: string): ?CommentObject {
        const match = line.match(jsdoc.singleLine);
        if (match) {
            // singleline
            return this.addDoc(match[1].trim());
        } else if (line.match(jsdoc.start)) {
            // start multiline
            this.addLine(line, true);
        } else if (this.unfinishedChunk.length) {
            if (line.match(jsdoc.end)) {
                // end multiline
                this.addLine(line);

                return this.addDoc(this.getRawCommentAndReset());
            } else if (line.match(jsdoc.line)) {
                // line multiline
                this.addLine(line);
            } else {
                // invalid line inbetween jsdoc
                this.resetChunk();
            }
        }

        return null;
    }

    addDoc(docBlock: string): CommentObject {
        const comment = parse(docBlock, { ...this.opts, unwrap: true });
        // $FlowIssue This is correct as objectMode === true
        this.push(comment);

        return comment;
    }

    _transform(chunk: string, encoding: string, callback: Function): void {
        const lines = chunk.toString().split(/\r?\n/);

        while (lines.length) {
            this.consumeLine(lines.shift());
        }

        callback();
    }

    extract(content: string): Array<CommentObject> {
        const comments = [];
        const lines = content.toString().split(/\r?\n/);

        while (lines.length) {
            const comment = this.consumeLine(lines.shift());
            if (comment) comments.push(comment);
        }

        return comments;
    }
}
