import AppError from '../../errors/AppError';
import BlogModel from '../blog/blog.model';
import { UserModel } from '../user/user.model';
import httpStatus from 'http-status';

const blockUseIntoDB = async (userId: string) => {
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
};
const deleteBlogFromDB = async (id: string) => {
  const blog = await BlogModel.findByIdAndDelete(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
};

export const AdminServices = {
  blockUseIntoDB,
  deleteBlogFromDB,
};
