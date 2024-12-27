import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TBlog } from './blog.interface';
import BlogModel from './blog.model';
import httpStatus from 'http-status';


const createBlogIntoDB = async (payload: TBlog, userId: string) => {
  const newBlog = {
    ...payload,
    author: userId,
  };
  const result = await BlogModel.create(newBlog);

  const author = await UserModel.findById(userId);

  return { result, author };
};


const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>, userId: string) => {

  const blog = await BlogModel.findById(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog Not Found")
  }

  if (blog?.author?.toString() !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not allowed to update this blog!");
  }

  Object.assign(blog, payload);
  const updatedBlog = await blog.save();

  const author = await UserModel.findById(updatedBlog.author);

  return { updatedBlog, author };
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB
};
