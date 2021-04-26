const express = require('express');

const path = require('path');
const Routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3000; 

app.use(express.json({extended: false}));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../README.md')));

app.get('/api/quizzes', Routes.getQuizzes);
app.get('/api/quizzes/:id', Routes.getQuiz);
app.post('/api/quizzes/:id/attempt', Routes.postQuiz);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
