/* eslint-disable indent */
/* eslint-disable camelcase */
const { Pool } = require('pg');

const pool = new Pool({
  host: '18.119.110.154',
  port: 5432,
  user: 'postgres',
  password: '',
  database: 'qa',
});

pool.connect();

const getQuestions = async (product_id, page, count) => {
  const offset = count * (page - 1);
  function nestQuery(query) {
    return `
      coalesce(
        (
          SELECT array_to_json(array_agg(row_to_json(x)))
          FROM (${query}) x
        ),
        '[]'
      )
      `;
  }

  let queryText = `
      SELECT
        q.id AS question_id,
        q.body AS question_body,
        q.date_written AS question_date,
        q.asker_name AS asker_name,
        q.helpful AS question_helpfulness,
        q.reported AS reported,
        ${nestQuery(
          `
            SELECT
              a.id AS id,
              a.body AS body,
              a.date_written AS date,
              a.answerer_name AS answerer_name,
              a.helpful AS helpfulness,
              ${nestQuery(
                `SELECT
                    p.url AS url
                  FROM answers_photos p
                  WHERE p.answer_id = a.id
                  `,
              )} AS photos
            FROM answers a
            WHERE a.question_id = q.id
            ORDER BY id ASC LIMIT ${5}
          `,
        )} AS answers
      FROM questions q
      WHERE q.product_id = (${product_id})
      ORDER BY id ASC OFFSET ${offset} LIMIT ${count}
    `;

  queryText = queryText.replace(/(\r\n|\n|\r)/gm, '');
  queryText = queryText.replace(/\s+/g, ' ').trim();

  const sendBack = await pool.query(queryText);

  return sendBack.rows;
};

const getAnswers = async (question_id, page, count) => {
  const offset = count * (page - 1);
  function nestQuery(query) {
    return `
      coalesce(
        (
          SELECT array_to_json(array_agg(row_to_json(x)))
          FROM (${query}) x
        ),
        '[]'
      )
      `;
  }

  let queryText = `
      SELECT
        a.id AS answer_id,
        a.body AS body,
        a.date_written AS date,
        a.answerer_name AS answerer_name,
        a.helpful AS helpfulness,
        ${nestQuery(
          `
            SELECT
              p.id as id,
              p.url AS url
            FROM answers_photos p
            WHERE p.answer_id = a.id
            ORDER BY id ASC LIMIT ${5}
          `,
        )} AS photos
      FROM answers a
      WHERE a.question_id = (${question_id})
      ORDER BY id ASC OFFSET ${offset} LIMIT ${count}
    `;

  queryText = queryText.replace(/(\r\n|\n|\r)/gm, '');
  queryText = queryText.replace(/\s+/g, ' ').trim();

  const sendBack = await pool.query(queryText);

  return sendBack.rows;
};

const getPhotos = (answer_id) => {
  const text = 'SELECT url FROM answers_photos where answer_id=($1) ORDER BY id ASC';
  const values = [answer_id];

  return new Promise((resolve, reject) => {
    pool.query(text, values)
      .then((result) => resolve(result.rows))
      .catch((err) => reject(err));
  });
};

const addQuestion = (product_id, body, date, name, email, reported, helpful) => {
  const text = 'INSERT INTO QUESTIONS (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7))';
  const values = [product_id, body, date, name, email, reported, helpful];

  return new Promise((resolve, reject) => {
    pool.query(text, values)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const addAnswer = (question_id, body, date, name, email, reported, helpful, photos) => {
  const text = 'INSERT INTO ANSWERS (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7)) RETURNING id';
  const values = [question_id, body, date, name, email, reported, helpful];
  const promises = [];

  return new Promise((resolve, reject) => {
    pool.query(text, values)
      .then((answerResult) => {
        const { id } = answerResult.rows[0];
        photos.forEach((photoUrl) => {
          const photosText = 'INSERT INTO ANSWERS_PHOTOS (answer_id, url) VALUES (($1), ($2))';
          const photosValues = [id, photoUrl];
          promises.push(
            pool.query(photosText, photosValues),
          );
        });

        Promise.all(promises)
          .then(() => {
            resolve('success');
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const questionHelpful = (question_id) => {
  const text = 'UPDATE questions SET helpful = helpful + 1 WHERE id = ($1)';
  const values = [question_id];

  return new Promise((resolve, reject) => {
    pool.query(text, values)
      .then((result) => resolve(result.rows))
      .catch((err) => reject(err));
  });
};

const reportQuestion = (question_id) => {
  const text = 'UPDATE questions SET reported = reported + 1 WHERE id = ($1)';
  const values = [question_id];

  return new Promise((resolve, reject) => {
    pool.query(text, values)
      .then((result) => resolve(result.rows))
      .catch((err) => reject(err));
  });
};

const answerHelpful = (answer_id) => {
  const text = 'UPDATE answers SET helpful = helpful + 1 WHERE id = ($1)';
  const values = [answer_id];

  return new Promise((resolve, reject) => {
    pool.query(text, values)
      .then((result) => resolve(result.rows))
      .catch((err) => reject(err));
  });
};

const reportAnswer = (answer_id) => {
  const text = 'UPDATE answers SET reported = reported + 1 WHERE id = ($1)';
  const values = [answer_id];

  return new Promise((resolve, reject) => {
    pool.query(text, values)
      .then((result) => resolve(result.rows))
      .catch((err) => reject(err));
  });
};

module.exports.getQuestions = getQuestions;
module.exports.getAnswers = getAnswers;
module.exports.getPhotos = getPhotos;
module.exports.addQuestion = addQuestion;
module.exports.addAnswer = addAnswer;
module.exports.questionHelpful = questionHelpful;
module.exports.reportQuestion = reportQuestion;
module.exports.answerHelpful = answerHelpful;
module.exports.reportAnswer = reportAnswer;
