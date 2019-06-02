export interface IPost {
  id?: number;
  title?: string;
  body?: any;
  author?: string;
}

export class Post implements IPost {
  constructor(public id?: number, public title?: string, public body?: any, public author?: string) {}
}
