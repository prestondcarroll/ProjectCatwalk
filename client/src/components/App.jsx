import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
<<<<<<< HEAD
import QA from './QA.jsx';
=======
import Overview from './Overview.jsx'
>>>>>>> ca008fb40b89f326b8289601ac42374942eb5841

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
<<<<<<< HEAD
      <QA />
=======
      <Overview/>
>>>>>>> ca008fb40b89f326b8289601ac42374942eb5841
    </div>
  )
}

export default App;