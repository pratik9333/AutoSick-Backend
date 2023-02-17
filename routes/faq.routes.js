const router = require("express").Router();
const {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
  addCommentToQuestion,
  addVoteToQuestion,
  getQuestion,
} = require("../controllers/faq.controller");

router.post("/", createQuestion);

router.put("/:questionID", updateQuestion);

router.delete("/:questionID", deleteQuestion);

router.get("/", getQuestions);

router.get("/:questionID", getQuestion);

router.put("/vote/:questionID", addVoteToQuestion);

router.put("/comment/:questionID", addCommentToQuestion);

module.exports = router;
