import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function AddToCart(props) {
  const [isMenuOpen, setIsMenuOpen]= useState(false);

  const myFunction = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div>
      <button id="atcButton" onClick={myFunction}>Add To Cart</button>
      {/* <Select className="fruit" options={options} menuIsOpen={isMenuOpen} /> */}
    </div>
  );
}

export default AddToCart;
