import { Router } from "express";
import { createBlog, deleteComment, deleteExistingBlog, editComment, fetchAllBlogs, fetchSingleBlog, fetchSingleBlogComments, updateBlog, updateBlogComments } from "../controls/blog.control";
import { checkAdminAcess, checkUser } from "../middleware/authentication";


const router = Router();

/**
 * ! Create a new blog
 * ! Method POST
 */
router.post("/", checkAdminAcess, createBlog);


/**
 * ? Update existing blog
 * ? Method PUT
 */
router.put("/:id", checkAdminAcess, updateBlog);


/**
 * * Delete Existing Blog
 * * Method DELETE
 */
router.delete("/:id", deleteExistingBlog);

/**
 * ! Fetch single blog
 * ! Method GET
 */


router.get("/:id", fetchSingleBlog);


/**
 * ? Fetch All Blog Posts
 * ? Method GET
 */

router.get("/", fetchAllBlogs);


/**
 * * Create Blog Comments
 * * Method PUT
 */
router.post("/:id/comments", checkUser, updateBlogComments)


/**
 * ! Fetch Single Blog Comments
 * ! Method GET
 */
router.get("/:id/comments", fetchSingleBlogComments);


/**
 * ? Delete Comment
 * ? Method DELETE 
 */
router.delete("/:id/comments/:creator", checkUser, deleteComment);

/**
 * * Edit Comment
 * * Method PUT
 */
router.put("/:id/comments/:creator", checkUser, editComment);




export default router;