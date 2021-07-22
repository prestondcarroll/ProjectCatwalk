import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import QA from './QA.jsx';

const Button = styled.button`
  background-color: yellow;
  color: black;
  padding: 1rem 2rem;
`
const App = () => {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/products',
    success: (data) => {
      console.log(data);
    },
    error: (err) => {
      console.log(err);
    }
  })
  return (
    <div>
      <Button>I am a button</Button>
      <QA />
    </div>
  )
}

export default App;