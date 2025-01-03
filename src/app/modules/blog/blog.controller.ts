import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import httpStatus from 'http-status';

const createBlog = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  console.log(req.user);

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

const updateBlog = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  const payload = req.body;
  const result = await BlogServices.updateBlogIntoDB(id, payload, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  await BlogServices.deleteBlogFromDB(id, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: {},
  });
});

const getAllBlog = catchAsync(async (req, res) => {
  const { search, sortBy, sortOrder, filter } = req.query;
  const result = await BlogServices.getAllBlogFromDB({
    search,
    sortBy,
    sortOrder,
    filter,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
};
