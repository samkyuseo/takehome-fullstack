const {getQuizzes, getQuiz, postQuiz} = require('../routes');
const mocks = require('node-mocks-http');
const quizzes = require('../../data/quizzes.json');

describe('API', () => {
  describe('getQuizzes', () => {
    it('returns a list of quizzes', async () => {
      // initialize req, res
      const req = mocks.createRequest();
      const res = mocks.createResponse();
      // make the req
      const response = await getQuizzes(req, res, {});
      // verify status code and that the correct object is returned (stringify to compare)
      expect(response.statusCode === 200 && JSON.stringify(quizzes) === JSON.stringify(response._getJSONData())).toBeTruthy();
    });
  });
  describe('getQuiz', () => {
    it('returns the data for a quiz', async () => {
      
      const req = mocks.createRequest();
      req._setParameter('id','math'); // mispell id on purpose
      const res = mocks.createResponse();
      
      const response = await getQuiz(req, res, {});
      // verify status code and make sure correct object is returned
      expect(response.statusCode === 200 && JSON.stringify(response._getJSONData()) === JSON.stringify(quizzes['math'])).toBeTruthy();
    });

    it('returns a 404 if the quiz cannot be found', async () => {
      const req = mocks.createRequest();
      req._setParameter('id','fake_id'); // fake id
      const res = mocks.createResponse();
      const response = await getQuiz(req, res, {});
      expect(response.statusCode === 404).toBeTruthy();
    });
  });

  describe('postQuiz', () => {
    it('returns the correct grades for the quiz', async () => {

      const req = mocks.createRequest(); 
      req._setParameter('id', 'math');
      req._addBody('answers', {"question_1": "2","question_2": "False"});
      const res = mocks.createResponse(); 

      const response = await postQuiz(req, res, {}); 

      const correct = JSON.stringify({
        "correct": 1,
        "incorrect": 1,
        "questions": {
            "question_1": true,
            "question_2": false
        }
      });
      expect(response.statusCode === 200 && correct === JSON.stringify(response._getJSONData())).toBeTruthy();
    });

    it('returns a 404 if the quiz cannot be found', async () => {

      const req = mocks.createRequest(); 
      req._setParameter('id', 'fake_id'); // fake test id
      req._addBody('answers', {"question_1": "2","question_2": "False"});
      const res = mocks.createResponse(); 

      const response = await postQuiz(req, res, {}); 
      
      expect(response.statusCode === 404).toBeTruthy();
    });

    it('returns a 404 if the question_id cannot be found', async () => {
      const req = mocks.createRequest(); 
      req._setParameter('id', 'math'); 
      req._addBody('answers', {"question_1": "2","fake_id": "False"}); // provide fake question id
      const res = mocks.createResponse(); 

      const response = await postQuiz(req, res, {}); 
      
      expect(response.statusCode === 404).toBeTruthy();
    });

    it('returns a 400 if answers are not in the request body', async () => {
      const req = mocks.createRequest(); 
      req._setParameter('id', 'math'); 
      const res = mocks.createResponse(); 
      // notice that there is no 'answers' obj added to the body

      const response = await postQuiz(req, res, {});
    
      expect(response.statusCode === 400).toBeTruthy();
    });
  });
});
