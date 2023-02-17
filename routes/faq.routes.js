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

const { isLoggedIn } = require("../middlewares/checkLoginStatus.middleware");

router.post("/", isLoggedIn, createQuestion);

router.put("/:questionID", isLoggedIn, updateQuestion);

router.delete("/:questionID", isLoggedIn, deleteQuestion);

router.get("/", getQuestions);

router.get("/:questionID", getQuestion);

router.put("/vote/:questionID", addVoteToQuestion);


router.put("/vote/:questionID", isLoggedIn, addVoteToQuestion);

router.put("/comment/:questionID", isLoggedIn, addCommentToQuestion);

module.exports = router;
