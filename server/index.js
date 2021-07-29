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
    url: baseUrl + `/products/`,
    success: (data) => {
      res.send(data);
    },
    error: (err) => {
      res.sendStatus(500, err);
    },
  });
});

app.get('/products/:product_id', (req, res) => {
  const productId = req.params.product_id;
  $.ajax({
    method: 'GET',
    url: baseUrl + `/products/${productId}/`,
    success: (data) => {
      res.send(data);
    },
    error: (err) => {
      res.sendStatus(500, err);
    },
  });
});

app.get('/products/:product_id/styles', (req, res) => {
  const productId = req.params.product_id;
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/products/${productId}/styles/`,
    success: (data) => {
      res.send(data);
    },
    error: (err) => {
      res.sendStatus(500, err);
    },
  });
});

app.get('/fullProducts/:product_id', (req, res) =>{
  const productId = req.params.product_id;
  let productPromise = new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: baseUrl + `/products/${productId}/`,
      success: (product) => {
        resolve(product)
      },
      error: (err) => {
        reject(err);
      }
    });
  });
  let stylesPromise = new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: baseUrl + `/products/${productId}/styles/`,
      success: (styles) => {
        resolve(styles);
      },
      error: (err) => {
        reject(err);
      }
    });
  });
  let reviewsPromise = new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: baseUrl + `/reviews/meta?product_id=${productId}`,
      success: (reviews) => {
        resolve(reviews);
      },
      error: (err) => {
        reject(err);
      }
    });
  });
  Promise.all([productPromise, stylesPromise, reviewsPromise])
  .then((values) => {
    let result = values[0];
    result.results = values[1].results;
    result.reviews = values[2]
    res.send(result)
  })
  .catch((err) => {
    res.sendStatus(500, err);
  });
})

app.get('/products/:product_id/related', (req, res) => {
  const productId = req.params.product_id;
  $.ajax({
    method: 'GET',
    url: baseUrl + `/products/${productId}/related/`,
    success: (productIds) => {
      let idPromises = productIds.map(id => {
        let productPromise = new Promise((resolve, reject) => {
          $.ajax({
            method: 'GET',
            url: baseUrl + `/products/${id}/`,
            success: (product) => {
              resolve(product)
            },
            error: (err) => {
              reject(err);
            }
          });
        });
        let stylesPromise = new Promise((resolve, reject) => {
          $.ajax({
            method: 'GET',
            url: baseUrl + `/products/${id}/styles/`,
            success: (styles) => {
              resolve(styles);
            },
            error: (err) => {
              reject(err);
            }
          });
        });
        let reviewsPromise = new Promise((resolve, reject) => {
          $.ajax({
            method: 'GET',
            url: baseUrl + `/reviews/meta?product_id=${id}`,
            success: (reviews) => {
              resolve(reviews);
            },
            error: (err) => {
              reject(err);
            }
          });
        });
        return [productPromise, stylesPromise, reviewsPromise]
      });
      const promise4all = Promise.all(
        idPromises.map(idPromise => {
          return Promise.all(idPromise);
        })
      );
      promise4all
      .then((values) => {
        let result = []
        values.forEach(idData => {
          let idResult = idData[0];
          idResult.results = idData[1].results;
          idResult.reviews = idData[2]
          result.push(idResult)
        })
        res.send(result);
      })
      .catch((err) => {
        res.sendStatus(500, err);
      });
    },
    error: (err) => {
      res.sendStatus(500, err);
    }
  });
});

app.get('/reviews/meta', (req, res) => {
  const productId = req.query.product_id;
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/reviews/meta?product_id=${productId}`,
    success: (data) => {
      // console.log(data);
      res.send(data);
    },
    error: (err) => {
      // console.log(err);
      res.sendStatus(500, err);
    },
  });
});

app.get('/questions', (req, res) => {
  $.ajax({
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/qa/questions?product_id=${req.query.productId}&page=1&count=50`,
    success: (data) => {
      res.send(data);
    },
    error: (err) => {
      res.sendStatus(500, err);
    }
  })
});

app.get('/answers', (req, res) => {
  $.ajax({
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/qa/questions/${req.query.questionId}/answers?page=1&count=30`,
    success: (data) => {
      data.results.sort((a, b) => b.helpfulness - a.helpfulness);
      res.send(data.results);
    },
    error: (err) => {
      // console.log(err)
      res.sendStatus(500, err);
    }
  })
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
