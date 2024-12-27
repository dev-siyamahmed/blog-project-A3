import { TBlog } from "./blog.interface";
import BlogModel from "./blog.model";


const createBlogIntoDB = async (payload: TBlog) => {
  const result = await BlogModel.create(payload);
  return result;
};

export const BlogServices = {
    createBlogIntoDB,
};
