/* @flow */
import Extractor from './Extractor';

export default (content: string, options: ?DoctrineOptions): Array<CommentObject> => {
    const extractor = new Extractor(options);

    return extractor.extract(content);
};
