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

router.post("/", createBlog);

router.put("/:blogid", updateBlog);

router.delete("/:blogid", deleteBlog);

router.get("/", getBlogs);

router.get("/:blogid", getBlog);

router.put("/like/:blogid", addLikeToBlog);

router.put("/comment/:blogid", addCommentsToBlog);

module.exports = router;
