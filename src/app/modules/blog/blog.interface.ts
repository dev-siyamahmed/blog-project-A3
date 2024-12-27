import { Schema } from 'mongoose';

export type TBlog = {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};
