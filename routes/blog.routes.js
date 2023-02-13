const router = require("express").Router();
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  addCommentsToBlog,
  addLikeToBlog,
} = require("../controllers/blog.controller");

const { isLoggedIn } = require("../middlewares/checkLoginStatus.middleware");

router.post("/", isLoggedIn, createBlog);

router.put("/:blogid", isLoggedIn, updateBlog);

router.delete("/:blogid", isLoggedIn, deleteBlog);

router.get("/", getBlogs);

router.put("/like/:blogid", isLoggedIn, addLikeToBlog);

router.put("/comment/:blogid", isLoggedIn, addCommentsToBlog);

module.exports = router;
