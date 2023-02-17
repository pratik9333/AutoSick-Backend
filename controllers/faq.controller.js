const Comment = require("../models/Comment.model");
const Forum = require("../models/FAQ.model");
const Query = require("../utils/query");

const {
  uploadPhotoAndReturnUrl,
  deletePhoto,
} = require("../utils/uploadPhoto");

exports.createQuestion = async (req, res) => {
  try {
    const { question, description, userid } = req.body;

    if (!question || !description) {
      res.status(400).json({ error: "All fields are required" });
    }

    if (req.files) {
      req.body.photo = await uploadPhotoAndReturnUrl("forum", req, res);
    }

    req.body.user = userid;

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
  const { question, description } = req.body;

  if (!question || !description) {
    res.status(400).json({ error: "All fields are required" });
  }

  try {
    const getQuestion = await Forum.findById(req.params.questionID);

    if (!getQuestion) {
      res
        .status(400)
        .json({ error: "No blog was found, please check your blog id" });
    }

    if (req.files) {
      if (getQuestion.photo.id) {
        await deletePhoto(getQuestion.photo.id);
      }

      req.body.photo = await uploadPhotoAndReturnUrl("forum", req, res);
    }

    const updatedQuestion = await Forum.findByIdAndUpdate(
      req.params.questionID,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "your question is updated successfully and visible in forum",
      updatedQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { questionID } = req.params;

  if (!questionID) {
    res.status(400).json({ error: "Question id is required" });
  }

  try {
    const getQuestion = await Forum.findById(questionID);

    if (!getQuestion) {
      res.status(400).json({
        error: "No question was found, please check your question id",
      });
    }

    if (getQuestion.photo.id) {
      await deletePhoto(getQuestion.photo.id);
    }

    await Forum.findByIdAndDelete(questionID, res);

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

    //creating object from our custom class and passing base = User.find(), bigQ = req.query, searchKey = <object key to search questions from>
    const forumObj = new Query(Forum.find(), req.query, "question");

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
    console.log(error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.addVoteToQuestion = async (req, res) => {
  const { userid } = req.body;
  const { questionID } = req.params;

  if (!userid) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const getQuestion = await Forum.findById(questionID);

    if (!getQuestion) {
      return res.status(400).json({
        error: "No question was found, please check your question id",
      });
    }

    console.log(getQuestion);

    for (let userID of getQuestion.votes.user) {
      if (userID.userid.toString() === userid) {
        return res
          .status(400)
          .json({ error: "You have already voted this question" });
      }
    }

    getQuestion.votes.user.push({ userid });
    getQuestion.votes.totalVotes += 1;

    await getQuestion.save();

    return res.status(200).json({
      success: true,
      message: "Question voted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const { questionID } = req.params;

    if (!questionID) {
      res.status(400).json({ error: "Please provide your question id" });
    }

    const getQuestion = await Forum.findById(questionID);

    if (!getQuestion) {
      res.status(400).json({
        error: "No question was found, please check your question id",
      });
    }

    const questionComments = Comment.find({ forum: getQuestion._id });

    res
      .status(200)
      .json({ success: true, question: { getQuestion, questionComments } });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.addCommentToQuestion = async (req, res) => {
  try {
    const { comment, userid } = req.body;
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

    const checkUsercomment = await Comment.find({
      user: userid,
      forum: questionID,
    });

    if (checkUsercomment.length !== 0) {
      return res
        .status(400)
        .json({ error: "you have already commented in this question" });
    }

    await Comment.create({
      user: userid,
      comment,
      forum: getQuestion._id,
    });

    await getQuestion.save();

    res.status(200).json({ success: true, message: "your comment was added!" });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.getQuestion = async (req, res) => {
  const { questionID } = req.params;

  if (!questionID) {
    return res.status(400).json({ error: "Question id is required" });
  }

  try {
    const getQuestion = await Forum.findById(questionID);

    if (!getQuestion) {
      return res
        .status(400)
        .json({ error: "No blog was found, please check your blog id" });
    }

    const comments = await Comment.find({ forum: getQuestion._id });

    return res.status(200).json({
      success: true,
      getQuestion,
      comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};
