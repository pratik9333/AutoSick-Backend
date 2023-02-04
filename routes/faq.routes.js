const router = require("express").Router();
const {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
} = require("../controllers/faq.controller");
const { authorizeAccessToken } = require("../utils/auth.config");

router.post("/", createQuestion);

router.put("/:questionID", updateQuestion);

router.delete("/:questionID", deleteQuestion);

router.get("/", getQuestions);

router.put("/vote/:questionID", addVoteToQuestion);

router.put("/comment/:questionID", addCommentToQuestion);

module.exports = router;
