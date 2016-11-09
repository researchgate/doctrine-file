/* @flow */

type CommentObject = {
  description: string,
};

type DoctrineOptions = {
  unwrap?: boolean,
  tags?: Array<string>,
  recoverable?: boolean,
  sloppy?: boolean,
  lineNumbers?: boolean,
};

declare module 'doctrine' {
  declare var parse: (comment: string, options: ?DoctrineOptions) => CommentObject;
}
