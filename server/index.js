const express = require('express');
const jsdom = require('jsdom');

const dom = new jsdom.JSDOM('');
const $ = require('jquery')(dom.window);

const PORT = 3000;
const API_KEY = require('../config.js');

$.ajaxPrefilter((settings, _, jqXHR) => {
  jqXHR.setRequestHeader('Authorization', API_KEY);
});


const app = express();

// app.use( express.json() );

// UNCOMMENT FOR REACT
app.use(express.static(`${__dirname}/../client/dist`));

const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea';

app.get('/products', (req, res) => {
  $.ajax({
    method: 'GET',
    url: baseUrl + '/products/',
    success: (data) => {
      res.send(data);
    },
    error: (err) => {
      res.sendStatus(500, err);
    },
  });
});

app.get('/products/:product_id/related', (req, res) => {
  const productId = req.params.product_id;
  $.ajax({
    method: 'GET',
    url: baseUrl + `/products/${productId}/related/`,
    success: (data) => {
      let promises = data.map(id => {
        return new Promise((resolve, reject) => {
          $.ajax({
            method: 'GET',
            url: baseUrl + `/products/${id}/`,
            success: (product) => {
              resolve(product);
            },
            error: (err) => reject(err)
          });
        });
      });
      Promise.all(promises).then(values => res.send(values));
    },
    error: (err) => {
      res.sendStatus(500, err);
    }
  });
});

app.get('/reviews', (req, res) => {
  $.ajax({
    method: 'GET',
    url: baseUrl + '/reviews/meta?product_id=20100',
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
