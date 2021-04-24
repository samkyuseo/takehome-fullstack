const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const Routes = require('./routes');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../README.md')));

app.get('/api/quizzes', Routes.getQuizzes);
app.get('/api/quizzes/:id', Routes.getQuiz);
app.post('/api/quizzes/:id/attempt', Routes.postQuiz);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
