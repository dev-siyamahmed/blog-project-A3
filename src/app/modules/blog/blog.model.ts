import { Schema, model } from 'mongoose';
import { TBlog } from './blog.interface';
 

const BlogSchema = new Schema<TBlog>(
  {
    title: { 
      type: String, 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    author: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    isPublished: { 
      type: Boolean, 
      default: true 
    },
  },
  {
    timestamps: true  
  }
);

// Create and export the Blog model
const BlogModel = model<TBlog>('Blog', BlogSchema);

export default BlogModel;
