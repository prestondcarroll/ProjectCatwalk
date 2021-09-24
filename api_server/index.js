/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable quotes */
const newrelic = require('newrelic');
const express = require('express');
const cors = require('cors');
const db = require('../database/index.js');

const app = express();
app.use(cors());
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static('client/dist'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get('/loaderio-ce5bd34cfe8f961828fbacd643731729/' , (req, res) => {
  res.sendFile('/home/ubuntu/api/sdc/public/loaderio.txt');
});

app.get('/qa/questions', async (req, res) => {
  newrelic.setTransactionName("GETQ");
  const { product_id } = req.query;
  let { page } = req.query;
  let { count } = req.query;

  if (count === undefined) {
    count = 5;
  }
  if (page === undefined) {
    page = 1;
  }

  const returnData = { "product_id": product_id.toString() };
  const resultRows = await db.getQuestions(product_id, page, count);

  resultRows.forEach((question) => {
    const date = new Date(parseInt(question["question_date"]));
    question["question_date"] = date.toISOString();

    if (question["reported"] > 0) {
      question["reported"] = true;
    } else {
      question["reported"] = false;
    }

    const answers = question["answers"];
    const newAnswers = {};
    answers.forEach((answer) => {
      const dateAns = new Date(parseInt(answer["date"]));
      answer["date"] = dateAns.toISOString();

      const newPhotos = [];
      const photos = answer["photos"];
      photos.forEach((photo) => {
        newPhotos.push(photo.url);
      });

      answer["photos"] = newPhotos;
      newAnswers[`${answer.id}`] = answer;
    });

    question["answers"] = newAnswers;
  });

  returnData["results"] = resultRows;

  res.send(returnData);
});

app.get('/qa/questions/:question_id/answers', async (req, res) => {
  newrelic.setTransactionName("GETA");
  const { question_id } = req.params;
  let { page } = req.query;
  let { count } = req.query;

  if (count === undefined) {
    count = 5;
  }
  if (page === undefined) {
    page = 1;
  }

  const returnData = { "question": question_id.toString(), "page": page, "count": count };
  const answerRows = await db.getAnswers(question_id, page, count);

  answerRows.forEach((answer) => {
    const date = new Date(parseInt(answer["date"]));
    answer["date"] = date.toISOString();
  });

  returnData["results"] = answerRows;
  res.send(returnData);
});

app.post('/qa/questions', (req, res) => {
  newrelic.setTransactionName("POSTQ");
  const { body } = req.body;
  const { name } = req.body;
  const { email } = req.body;
  const { product_id } = req.body;
  const date = new Date().getTime();
  const reported = 0;
  const helpful = 0;

  db.addQuestion(product_id, body, date, name, email, reported, helpful)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  newrelic.setTransactionName("POSTA");
  const { question_id } = req.params;
  const { body } = req.body;
  const { name } = req.body;
  const { email } = req.body;
  const { photos } = req.body;
  const date = new Date().getTime();
  const reported = 0;
  const helpful = 0;

  db.addAnswer(question_id, body, date, name, email, reported, helpful, photos)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });

  // res.send({ hi: '123' });
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  newrelic.setTransactionName("PUTQH");
  const { question_id } = req.params;
  db.questionHelpful(question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  newrelic.setTransactionName("PUTQR");
  const { question_id } = req.params;
  db.reportQuestion(question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  newrelic.setTransactionName("PUTAH");
  const { answer_id } = req.params;
  db.answerHelpful(answer_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  newrelic.setTransactionName("PUTAR");
  const { answer_id } = req.params;
  db.reportAnswer(answer_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
