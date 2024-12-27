import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import httpStatus from 'http-status';

const createBlog = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { result, author } = await BlogServices.createBlogIntoDB(
    req.body,
    userId,
  );
  const responseData = {
    _id: result._id,
    title: result.title,
    content: result.content,
    author,
  };
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: responseData,
  });
});

export const BlogControllers = {
  createBlog,
};
