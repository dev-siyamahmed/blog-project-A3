
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import httpStatus from 'http-status';

const createBlog= catchAsync(async (req, res) => {
    const { title, content } = req.body;
    const result = await BlogServices.createBlogIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Blog created successfully',
        data: result
    });
});


export const BlogControllers = {
   createBlog,
};
