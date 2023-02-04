const Forum = require("../models/FAQ.model");

const {
  uploadPhotoAndReturnUrl,
  deletePhoto,
} = require("../utils/uploadPhoto");

exports.createQuestion = async (req, res) => {
  try {
    const { question, description } = req.body;

    if (!question || !description) {
      res.status(400).json({ error: "All fields are required" });
    }

    if (req.files) {
      req.body.photo = await uploadPhotoAndReturnUrl();
    }

    const Question = await Forum.create(req.body);

    return res.status(200).json({
      success: true,
      message: "your question is uploaded successfully and visible in forum",
      Question,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { question, description } = req.body;

    if (!question || !description) {
      res.status(400).json({ error: "All fields are required" });
    }

    const getQuestion = await Blog.findById(req.params.questionID);

    if (!getQuestion) {
      res
        .status(400)
        .json({ error: "No blog was found, please checkb your blog id" });
    }

    if (req.files) {
      try {
        if (getQuestion.photo.id) {
          await deletePhoto(getQuestion.photo.id);
        }

        req.body.photo = await uploadPhotoAndReturnUrl();
      } catch (error) {
        res
          .status(500)
          .json({ error: "Photo failed to upload, please try again" });
      }
    }

    const updatedQuestion = await Blog.findByIdAndUpdate(
      req.params.questionID,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "your question is updated successfully and visible in forum",
      updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { questionID } = req.params;

    if (!questionID) {
      res.status(400).json({ error: "Question id is required" });
    }

    const getQuestion = await Blog.findById(questionID);

    if (!getQuestion) {
      res.status(400).json({
        error: "No question was found, please check your question id",
      });
    }

    if (getQuestion.photo.id) {
      await deletePhoto(getQuestion.photo.id);
    }

    await Blog.findByIdAndDelete(questionID);

    return res.status(200).json({
      success: true,
      message: "your question is deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questionsCount = await Forum.countDocuments();
    const resultPerPage = 8;

    //creating object from our custom class and passing base = User.find(), bigQ = req.query
    const forumObj = new Query(Forum.find(), req.query);

    forumObj.search();
    forumObj.pager(resultPerPage);

    let questions = await forumObj.base;
    let filteredQuestions = questions.length;

    return res.status(200).json({
      success: true,
      questions,
      totalQuestions: questionsCount,
      filteredQuestions: filteredQuestions,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.addVoteToQuestion = async (req, res) => {
  try {
    const { vote } = req.body;
    const { questionID } = req.params;

    if (vote === undefined) {
      res.status(400).json({ error: "vote action is required" });
    }

    const getQuestion = await Forum.findById(questionID);

    if (!getQuestion) {
      res.status(400).json({
        error: "No question was found, please check your question id",
      });
    }

    if (vote) {
      getQuestion.votes = getQuestion.votes + 1;
    }

    await getQuestion.save();

    return res.status(200).json({
      success: true,
      message: "Question voted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.addCommentToQuestion = async (req, res) => {
  try {
    const { comment } = req.body;
    const { questionID } = req.params;

    if (!comment) {
      res
        .status(400)
        .json({ error: "Please provide your comment, it cannot be empty" });
    }

    const getQuestion = await Forum.findById(questionID);

    if (!getQuestion) {
      res.status(400).json({
        error: "No question was found, please check your question id",
      });
    }

    getQuestion.comments.push({ user: "1212121212", comment });

    await getQuestion.save();

    res.status(200).json({ success: true, message: "your comment was added!" });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};
