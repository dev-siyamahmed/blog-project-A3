import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),

    content: z.string({
      required_error: 'Content is required',
      invalid_type_error: 'Content must be a string',
    }),

    isPublished: z
      .boolean({ invalid_type_error: 'isPublished must be a boolean' })
      .optional(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ invalid_type_error: 'Title must be a string' })
      .optional(),
    content: z
      .string({ invalid_type_error: 'Content must be a string' })
      .optional(),
    author: z
      .string({ invalid_type_error: 'Author must be a valid ObjectId string' })
      .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid author ID format' })
      .optional(),
    isPublished: z
      .boolean({ invalid_type_error: 'isPublished must be a boolean' })
      .optional(),
  }),
});

export const BlogsValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
