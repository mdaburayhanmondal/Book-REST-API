require('dotenv').config({ quiet: true });
const express = require('express');
const app = express();
const cors = require('cors');
const booksRoute = require('./src/routes/booksRoute.js');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// view all books
app.use('/books', booksRoute);

app.use('/', (req, res) => {
  res.json({
    allBooks: `Visit /books to view all books`,
    specificBook: 'Visit /books/id to view specific book',
  });
});

app.listen(port, () => {
  console.log(`Server is running ---> http://localhost:${port}`);
});
