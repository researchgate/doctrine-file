/* eslint-env jest */
import parseFile from '../parseFile';

function createTests(lineending) {
    test(`Single line comments without options (${lineending})`, done => {
        parseFile(`${__dirname}/data/singleline_${lineending}`, (err, comments) => {
            expect(err).toBeFalsy();
            expect(comments).toEqual([
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
            done();
        });
    });

    test(`Multi line comments without options (${lineending})`, done => {
        parseFile(`${__dirname}/data/multiline_${lineending}`, (err, comments) => {
            expect(err).toBeFalsy();
            expect(comments).toEqual([
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
            done();
        });
    });

    test(`Single line comments with options (${lineending})`, done => {
        parseFile(`${__dirname}/data/singleline_${lineending}`, { lineNumbers: true }, (err, comments) => {
            expect(err).toBeFalsy();
            expect(comments).toEqual([
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
            done();
        });
    });

    test(`Multi line comments with options (${lineending})`, done => {
        parseFile(`${__dirname}/data/multiline_${lineending}`, { lineNumbers: true }, (err, comments) => {
            expect(err).toBeFalsy();
            expect(comments).toEqual([
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
            done();
        });
    });
}

createTests('lf');
createTests('crlf');
