/* eslint-env jest */
import { parseFile, parseFileContent } from '../index';

test('Exports parseFile', () => {
    expect(typeof parseFile).toBe('function');
});

test('Exports parseFileContent', () => {
    expect(typeof parseFileContent).toBe('function');
});
