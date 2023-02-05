const Blog = require("../models/Blog.model");
const Comment = require("../models/Comment.model");

const {
  uploadPhotoAndReturnUrl,
  deletePhoto,
} = require("../utils/uploadPhoto");

exports.createBlog = async (req, res) => {
  try {
    const { title, description, body, userid } = req.body;

    if (!title || !description || !body) {
      res.status(400).json({ error: "All fields are required" });
    }

    if (req.files) {
      req.body.photo = await uploadPhotoAndReturnUrl();
    }

    req.body.user = userid;

    const blog = await Blog.create(req.body);

    return res.status(200).json({
      success: true,
      message: "your blog is uploaded successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, description, body } = req.body;

    if (!title || !description || !body) {
      res.status(400).json({ error: "All fields are required" });
    }

    const getBlog = await Blog.findById(req.params.blogid);

    if (!getBlog) {
      res
        .status(400)
        .json({ error: "No blog was found, please checkb your blog id" });
    }

    if (req.files) {
      try {
        if (getBlog.photo.id) {
          await deletePhoto(getBlog.photo.id);
        }

        req.body.photo = await uploadPhotoAndReturnUrl();
      } catch (error) {
        res
          .status(500)
          .json({ error: "Photo failed to upload, please try again" });
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.blogid,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "your blog is updated successfully",
      updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { blogid } = req.params;

    if (!blogid) {
      res.status(400).json({ error: "Blog id is required" });
    }

    const getBlog = await Blog.findById(blogid);

    if (!getBlog) {
      res
        .status(400)
        .json({ error: "No blog was found, please checkb your blog id" });
    }

    if (getBlog.photo.id) {
      await deletePhoto(getBlog.photo.id);
    }

    await Blog.findByIdAndDelete(blogid);

    return res.status(200).json({
      success: true,
      message: "your Blog is deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogsCount = await Blog.countDocuments();
    const resultPerPage = 8;

    //creating object from our custom class and passing base = User.find(), bigQ = req.query
    const blogObj = new Query(Blog.find(), req.query);

    blogObj.search();
    blogObj.pager(resultPerPage);

    let Blogs = await blogObj.base;
    let filteredBlogs = Blogs.length;

    return res.status(200).json({
      success: true,
      Blogs,
      totalBlogsCount: blogsCount,
      filteredBlogs: filteredBlogs,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const { blogid } = req.params;

    if (!blogid) {
      res.status(400).json({ error: "Blog id is required" });
    }

    const getBlog = await Blog.findById(blogid);

    if (!getBlog) {
      res
        .status(400)
        .json({ error: "No blog was found, please check your blog id" });
    }

    const blogComments = Comment.find({ blog: getBlog._id });

    return res.status(200).json({
      success: true,
      blog: { getBlog, blogComments },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.addLikeToBlog = async (req, res) => {
  try {
    const { userid } = req.body;
    const blog = await Blog.findById(req.params.blogid);

    if (!blog) {
      return res
        .status(400)
        .json({ error: "Blog not found, please check blog id" });
    }

    for (let userID of blog.likes.user) {
      if (userID.toString() === userid) {
        return res
          .status(400)
          .json({ error: "You have already liked this blog" });
      }
    }

    blog.likes.user.push({ user: userid });
    blog.likes += 1;

    await blog.save();

    res.status(200).json({ success: true, message: "Liked!" });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.addCommentsToBlog = async (req, res) => {
  try {
    const { comment, userid } = req.body;
    const { blogid } = req.params;

    if (!comment) {
      return res
        .status(400)
        .json({ error: "Please provide your comment, it cannot be empty" });
    }

    const blog = await Blog.findById(blogid);

    if (!blog) {
      return res
        .status(400)
        .json({ error: "Blog not found, please check blog id" });
    }

    const checkUsercomment = await Comment.find({ user: userid, blog: blogid });

    if (checkUsercomment) {
      return res
        .status(400)
        .json({ error: "you have already commented this blog" });
    }

    await Comment.create({ user: userid, comment, blog: blog._id });

    res.status(200).json({ success: true, message: "your comment was added!" });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};
