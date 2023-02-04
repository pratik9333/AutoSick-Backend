const router = require("express").Router();
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  addCommentsToBlog,
  addLikeToBlog,
} = require("../controllers/blog.controller");
const { authorizeAccessToken } = require("../utils/auth.config");

router.post("/", createBlog);

router.put("/:blogid", updateBlog);

router.delete("/:blogid", deleteBlog);

router.get("/", getBlogs);

router.put("/like/:blogid", addLikeToBlog);

router.put("/comment/:blogid", addCommentsToBlog);

module.exports = router;
