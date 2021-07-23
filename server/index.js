const express = require('express');
const jsdom = require('jsdom');

const dom = new jsdom.JSDOM('');
const $ = require('jquery')(dom.window);

const PORT = 3000;
const API_KEY = require('../config.js');

$.ajaxPrefilter((settings, _, jqXHR) => {
  jqXHR.setRequestHeader('Authorization', API_KEY);
});
console.log(API_KEY);

const app = express();

// app.use( express.json() );

// UNCOMMENT FOR REACT
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/products', (req, res) => {
  $.ajax({
    method: 'GET',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/',
    success: (data) => {
      console.log(data);
      res.send(data);
    },
    error: (err) => {
      console.log(err);
      res.sendStatus(500, err);
    },
  });
});

app.get('/reviews', (req, res) => {
  $.ajax({
    method: 'GET',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews/meta?product_id=20100',
    success: (data) => {
      console.log(data);
      res.send(data);
    },
    error: (err) => {
      console.log(err);
      res.sendStatus(500, err);
    },
  });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
