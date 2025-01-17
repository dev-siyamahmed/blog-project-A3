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

const updateBlogIntoDB = async (
  id: string,
  payload: Partial<TBlog>,
  userId: string,
) => {
  const blog = await BlogModel.findById(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog Not Found');
  }

  if (blog?.author?.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not allowed to update this blog!',
    );
  }

  Object.assign(blog, payload);
  const updatedBlog = await blog.save();

  const author = await UserModel.findById(updatedBlog.author);

  return { updatedBlog, author };
};

const deleteBlogFromDB = async (blogId: string, userId: string) => {
  const blog = await BlogModel.findById(blogId);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog Not Found');
  }

  if (blog.author.toString() !== userId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to delete this blog',
    );
  }

  const result = await BlogModel.findByIdAndDelete(blogId);

  return result;
};


const getAllBlogFromDB = async ({ search, sortBy = 'createdAt', sortOrder = 'asc', filter }: any) => {
  // Search condition
  const searchCondition = search
    ? {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  // Filter condition
  const filterCondition = filter ? { author: filter } : {};

  // Sort condition
  const sortCondition: any = {};
  if (sortBy) {
    sortCondition[sortBy] = sortOrder === 'asc' ? 1 : -1;
  }

  const blogs = await BlogModel.find({ ...searchCondition, ...filterCondition })
    .sort(sortCondition) 
    .populate('author', 'name email'); 

  return blogs;
};


export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogFromDB,
};
