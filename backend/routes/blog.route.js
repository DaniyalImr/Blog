import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getMyBlogs, getSingleBlog, getUpdateBlog } from "../controller/blog.controller.js"
import { isAdmin, isAuthenticated } from "../middleware/authUser.js"


const router=express.Router()

router.post("/create",isAuthenticated,isAdmin("admin"),createBlog)
router.delete("/delete/:id",isAuthenticated,deleteBlog)
router.get("/all-blogs",getAllBlogs)
router.get("/single-blog/:id",isAuthenticated,getSingleBlog)
router.get("/myblog",isAuthenticated,isAdmin("admin"),getMyBlogs)
router.put("/update/:id",isAuthenticated,isAdmin("admin"),getUpdateBlog)
export default router