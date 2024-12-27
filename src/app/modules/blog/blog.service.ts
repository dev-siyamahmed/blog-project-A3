import { UserModel } from '../user/user.model';
import { TBlog } from './blog.interface';
import BlogModel from './blog.model';

const createBlogIntoDB = async (payload: TBlog, userId: string) => {
  const newBlog = {
    ...payload,
    author: userId,
  };
  const result = await BlogModel.create(newBlog);

  const author = await UserModel.findById(userId);

  return { result, author };
};

export const BlogServices = {
  createBlogIntoDB,
};
