# 📝 Quiz App

Welcome! As the world's largest interview prep community and learning platform, we're always working to build better learning experiences for our users. This project is designed to give you a fun, hands-on example of what it would be like to develop products at Exponent.

## Assignment

In this takehome assignment, you'll be building the API for a simple **Quiz app** that allows the user to take a multiple choice quiz, which will be graded automatically by the server for instant feedback.

The user interface for the quiz won't be part of this project—instead it's up to you to create the backend API that the UI will eventually integrate with. Don't worry about persisting data or user authentication for now–that's out of scope for this project.

> Note: We've set up a simple server using Node and Express.js to make it easier to get started with building. You should be able to accomplish the project without additional dependencies, but feel free to import more libraries if you want.

Here's the list of features we'd like our app to support:
* Fetching quiz data from the API 
* Submitting quiz answers and returning the grade to the client
* Test coverage - we've stubbed out a few test cases for you to get started

You can refer to the documentation below to understand what API endpoints to implement.

## Evaluation
We'll evaluate your submission on the following criteria:
* Functionality: Does your solution work as intended and meet the spec for the API? Is your code written defensively, i.e., does it handle invalid inputs and errors?
* Craft: Does your code follow best practices and expected behavior? Is your code easy to read and commented appropriately?

## Development

To get started, download the repo or click "Use this template" to create a private version of this project. 
After downloading the repo, go to the directory and run 
```
npm install
```
followed by 
```
npm start
```
You can access the local server at [localhost:3000](http://localhost:3000). You can then create or modify files in the `src/` directory.

To run the tests (not yet implemented), run `npm test`.

## API Documentation

### **GET `/api/quizzes`**

Returns an array of available quizzes, with title and ID.

**Response**

| Key | Type | Description
| -- | -- | -- |
| `id` | `String` | A unique identifier for the quiz, e.g. 'math'
| `title` | `String` | The human-readable title of the quiz

### **GET `/api/quizzes/:id`**
Returns a Quiz object to the client given a valid quiz ID, omitting the correct answers. Quiz content is available in `data/quizzes.json` which you can use in your implementation. Returns a 404 if the requested quiz cannot be found.

**Request**

| Key | Type | Description
| -- | -- | -- |
| `id` | `String` | A unique identifier for the quiz


**Response**

| Key | Type | Description
| -- | -- | -- |
| `id` | `String` | A unique identifier for the quiz, e.g. 'math'
| `title` | `String` | The human-readable title of the quiz
| `questions` | `Array<Question>` | An array of multiple choice questions


**`Question` Format**
| Key | Type | Description
| -- | -- | -- |
| `id` | `String` | An id for the question, unique to this quiz, e.g. "question_1"
| `text` | `String` | The text content of the question
| `options` | `Array<String>` | A list of multiple choice options

Example response:
```json
{
  "id": "example",
  "title": "My Quiz",
  "questions": [{
    "id": "question_1",
    "text": "What is 1 + 1?",
    "options": ["1", "2", "3"]
  }, {
    "id": "question_2",
    "text": "True or false: 2 + 2 = 4",
    "options": ["True", "False"]
  }]
}
```

### **POST `/api/quizzes/:id/attempt`**

Handles submitting a quiz attempt and returns a graded result showing which questions were correct and incorrect.

**Request**
| Key | Type | Description
| -- | -- | -- |
| `answers` | `{[id: String]: String}` | An object mapping ID of each question to the user-provided value

**Response**
| Key | Type | Description
| -- | -- | -- |
| `correct` | `Number` | Number of correct answers
| `incorrect` | `Number` | Number of incorrect answers
| `questions` | `{[id: String]: Boolean}` | An object mapping ID of each question to the graded result, where `true` represents a correct answer.

```json
// POST /api/quizzes/math/attempt
{
  "answers": {
    "question_1": "2",
    "question_2": "False"
  }
}

// Response
{
  "correct": 1,
  "incorrect": 1,
  "questions": {
    "question_1": true,
    "question_2": false,
  }
}
```
