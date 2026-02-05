require('dotenv').config({ quiet: true });
const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
const booksRoute = require('./src/routes/booksRoute.js');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: [`http://localhost:${port}`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  }),
);

app.use(compression());
// // without this, size of demoData is around 40kb, but with it the size is around 400b

// view all books
app.use('/books', booksRoute);

app.get('/', (req, res) => {
  res.json({
    allBooks: `Visit /books to view all books`,
    specificBook: 'Visit /books/id to view specific book',
    blankSpace: ' '.repeat(200),
    demoData: 'Checking compression'.repeat(2000),
  });
});

app.listen(port, () => {
  console.log(`Server is running ---> http://localhost:${port}`);
});
