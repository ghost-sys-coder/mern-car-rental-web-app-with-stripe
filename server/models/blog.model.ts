import { Schema, model } from "mongoose";
import { IBlog } from "../types";


const BlogSchema = new Schema<IBlog>({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        type: String,
        required: [true, "Main Image is required!"]
    },
    title: {
        type: String,
        required: [true, "Blog title is required!"],
    },
    description: {
        type: String,
        required: [true, "Blog description required!"]
    },
    tags: {
        type: [String],
        required: [true, "Select tags"]
    },
    comments: [{
        creator: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    }]
}, { timestamps: true });


/** indexing for search */
BlogSchema.index({ title: "text", tags: "text" });


const Blog = model("Blog", BlogSchema);


export default Blog;
