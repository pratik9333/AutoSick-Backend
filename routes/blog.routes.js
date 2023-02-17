const router = require("express").Router();
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  addCommentsToBlog,
  addLikeToBlog,
  getBlog,
} = require("../controllers/blog.controller");

const { isLoggedIn } = require("../middlewares/checkLoginStatus.middleware");

router.post("/", isLoggedIn, createBlog);

router.put("/:blogid", isLoggedIn, updateBlog);

router.delete("/:blogid", isLoggedIn, deleteBlog);

router.get("/", getBlogs);

router.get("/:blogid", getBlog);

router.put("/like/:blogid", addLikeToBlog);

router.put("/like/:blogid", isLoggedIn, addLikeToBlog);

router.put("/comment/:blogid", isLoggedIn, addCommentsToBlog);

module.exports = router;
