/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import QA from './QA.jsx';
import Overview from './Overview.jsx';


// should put default back to 20100 before pull request
const DEFAULT_PRODUCT_ID = 20100;

const App = () => {
  [productId, setProductId] = useState(DEFAULT_PRODUCT_ID);
  [outfit, setOutfit] = useState([]);
  return (
    <div>
      <Overview />
      <QA />
    </div>
  );
};

export default App;
