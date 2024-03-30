import { Request, Response } from "express";
import Blog from "../models/blog.model";
import { connectToDB } from "../database/mongodb";
import { IBlog } from "../types";


/**
 * ! Create a new blog
 * ! Method POST
 */
const createBlog = async (req: Request, res: Response) => {
    /** connect to mongodb */
    await connectToDB();

    const {
        creator, title, description,
        tags, comments, image
    }: IBlog = await req.body;

    
    try {
        const blog = await Blog.create({
            creator, title, description, 
            image, tags, comments
        });
        return res.status(200).json({
            message: "Your blog has been created!",
            success: true,
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
};


/**
 * ? Update existing blog
 * ? Method PUT
 */
const updateBlog = async (req: Request, res: Response) => {
    /** await connection to mongodb */
    await connectToDB();

    const { id } = req.params;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            req.body
            , {
            new: true,
            multi: true
            });
        return res.status(200).json(updatedBlog);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
}


/**
 * * Delete Existing Blog
 * * Method DELETE
 */
const deleteExistingBlog = async (req: Request, res: Response) => {
    /** await connection to mongodb */
    await connectToDB();

    const { id } = req.params;

    try {
        await Blog.findByIdAndDelete(id);
        return res.status(200).json({message: "Blog has been deleted!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
}


/**
 * ! Fetch single blog
 * ! Method GET
 */
const fetchSingleBlog = async (req: Request, res: Response) => {
    /** await connection to mongodb */
    await connectToDB();

    const { id } = req.params;

    try {
        const blog = await Blog.findById(id).populate("creator");
        return res.status(200).json(blog);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
}


/**
 * ? Fetch All Blog Posts
 * ? Method GET
 */

const fetchAllBlogs = async (req: Request, res: Response) => {
    /** await connection to mongodb */
    await connectToDB();

    try {
        const blogs = await Blog.find({});
        return res.status(200).json(blogs)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
}


/** 
 * * Create Blog Comments
 * * Method POST
 */
const updateBlogComments = async (req: Request, res: Response) => {
    /** await mongo connection */
    await connectToDB();

    const { id } = req.params;

    const { creator, description, name, email } = await req.body.comments;

    try {
        /** find blog */
        const blog = await Blog.findById(id);
        
        if (!blog) {
            return res.status(404).json({ message: "Blog Not Found!" });
        }

        /** check if user already commented on this blog post */
        const existingComment = blog.comments.find(comment => comment.creator === creator);

        /** If the user already commented */
        if (existingComment) {
            return res.status(400).json({ message: "You can only comment once on a blog post!" });
        }

        /** Add a comment */
         blog.comments.push({
            creator, description,
            name, email
         })
        
        /** Save to DB */
        await blog.save();
        
        return res.status(200).json(blog);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
}

/**
 * ! Fetch Single Blog Comments
 * ! Method GET
 */
const fetchSingleBlogComments = async (req: Request, res: Response) => {
    /** await mongodb connection */
    await connectToDB();

    const { id } = req.params;

    try {
        /** find blog by id */
        const blog = await Blog.findById(id);

        /** check if blog does not exist */
        if (!blog) {
            return res.status(404).json({message: "Blog Not Found!"})
        }

        /** retrieve comments for this blog */
        const comments = blog.comments;

        return res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
}


/**
 * ? Delete Comment
 * ? Method DELETE 
 */
const deleteComment = async (req: Request, res: Response) => {
    /** await mongoDB connection */
    await connectToDB();

    const { id, creator } = req.params;

    try {
        /** check if blog exists */
        const blog = await Blog.findById(id);
        
        /** if the blog does not exist */
        if (!blog) {
            return res.status(404).json({message: "Blog Not Found!"})
        }

        const index = blog.comments.findIndex(comment => comment.creator === creator);

        /** if comment with the creator exists */
        if (index !== -1) {
            blog.comments.splice(index, 1); 
            await blog.save();
            return res.status(200).json({ message: "Comment has been deleted!" }); 
        } else {
            return res.status(404).json({message: "Comment Not Found!"})
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
}


/**
 * * Edit Comment
 * * Method PUT
 */
const editComment = async (req: Request, res: Response) => {
    /** await mongoconnection for vercel upload */
    await connectToDB();

    const { id, creator } = req.params;

    const { name, email, description } = req.body.details;

    try {
        /** check if the blog exists */
        const blog = await Blog.findById(id);
        
        /** if the blog does not exist */
        if (!blog) {
            return res.status(404).json({message: "Blog Not Found!"})
        }

        /** check if the comment to be editted exists */
        const comment = blog.comments.find((comment) => comment.creator === creator);

        /** if the comment does not exist */
        if (!comment) {
            return res.status(404).json({ message: "Comment Not Found!" });
        }

        /** update comment */
        comment.name = name;
        comment.email = email;
        comment.description = description;

        /** update the blog */
        await blog.save();

        return res.status(200).json({message: "Comment Updated!"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
}



export {
    createBlog,
    updateBlog,
    deleteExistingBlog,
    fetchSingleBlog,
    fetchAllBlogs,
    updateBlogComments,
    fetchSingleBlogComments,
    deleteComment,
    editComment
}