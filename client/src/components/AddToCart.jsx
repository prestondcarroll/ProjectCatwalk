/* eslint-disable react/button-has-type */
import React from 'react';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '35px',
};

const buttonStyles = {
  fontSize: '20px',
};

function AddToCart(props) {
  const handleClick = () => {
    props.openMenu(true);
  };

  return (
    <div style={styles}>
      <button style={buttonStyles} id="atcButton" onClick={handleClick}>Add To Cart</button>
    </div>
  );
}

export default AddToCart;
