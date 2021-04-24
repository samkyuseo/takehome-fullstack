const quizzes = require('../../data/quizzes.json');

/**
 * Returns a list of quizzes with titles and IDs
 */
async function getQuizzes(req, res, next) {
  // TODO: Your code goes here
}

/** 
 * Returns quiz data for the given ID, omitting the answers
 */
async function getQuiz(req, res, next) {
  // TODO: Your code goes here
}

/**
 * Handles a quiz submission and returns a graded result
 */
async function postQuiz(req, res, next) {
  // TODO: Your code goes here
}

module.exports = {
  getQuizzes,
  getQuiz,
  postQuiz,
};
