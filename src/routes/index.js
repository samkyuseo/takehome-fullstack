const quizzes = require('../../data/quizzes.json');

// @route  GET api/quizzes 
// @desc   Returns a list of quizzes with titles and IDs
// @access Public
async function getQuizzes(req, res) {
  // return quizzes
  return res.status(200).json(quizzes);
}

// @route  GET api/quizzes/:id
// @desc   Returns quiz data for the given ID, omitting the answers
// @access Public
async function getQuiz(req, res) {
   // find quiz
   const id = req.params.id
   var quiz = undefined
   for(const key in quizzes){
     if(quizzes[key].id == id) {
       quiz = quizzes[key];
     }
   }
  // quiz does not exist
  if (quiz == undefined) {
    return res.status(404).json({errors: [{
        "msg": "A quiz with the id " + id + " doesn't exist",
        "param": "id",
        "location": "params"
      }]
    });
  }
  // quiz found, return in json format
  return res.status(200).json(quiz);
}

// @route  POST api/quizzes/:id/attempt
// @desc   Handles a quiz submission and returns a graded result
// @access Public
async function postQuiz(req, res) {
  // validate req.body
  
  if (req.body.answers === undefined) {
    // bad request
    return res.status(400).json({errors: [{
      "msg": "answers is required",
      "param": "answers",
      "location": "body"
    }]
  });
  }
  // find quiz
  const id = req.params.id
  var quiz = undefined
  for(const key in quizzes){
    if(quizzes[key].id == id) {
      quiz = quizzes[key];
    }
  }
  // quiz does not exist
  if (quiz == undefined) {
    return res.status(404).json({errors: [{
        "msg": "A quiz with the id " + id + " doesn't exist",
        "param": "id",
        "location": "params"
      }]
    });
  }

  // generate response 
  var correct = 0;
  var incorrect = 0;
  var questions = {};

  // push solutions into a dict so its easier to search
  var sol = {}
  for (const q of quiz.questions) {
    sol[q.id] = q;
  }
  // answers submited by the user
  const answers = req.body.answers

  for (const ques_id in answers) {
    // the question id does not exist so return with a bad req error
    if (sol[ques_id] == undefined) {
      return res.status(404).json({errors: [{
          "msg": "A question with the id "+ques_id +" doesn't exist",
          "param": ques_id,
          "location": "answers"
        }]
      });
    }
    // compare answers
    if (sol[ques_id]['answer'] != answers[ques_id]) {
      incorrect++;
      questions[ques_id] = false;
    }
    else {
      correct++;
      questions[ques_id] = true;
    }
  }

  // throw in to an object
  const obj = {correct, incorrect, questions}
  // return response obj in json form
  return res.status(200).json(obj)
}

module.exports = {
  getQuizzes,
  getQuiz,
  postQuiz,
};
