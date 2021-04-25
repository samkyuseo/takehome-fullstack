const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const Routes = require('./routes');

const app = express();

// look for environment variable called port when deployed. if local take 3000
const PORT = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
// test 
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../README.md')));

app.get('/api/quizzes', Routes.getQuizzes);
app.get('/api/quizzes/:id', Routes.getQuiz);
app.post('/api/quizzes/:id/attempt', Routes.postQuiz);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
