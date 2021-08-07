/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  fontWeight: 'bold',
  fontSize: '1.17em',
  marginTop: '.75em',
};

// const quantityStyle = {
//   fontSize: '150',
//   marginTop: '0em',
//   marginBottom: '0em',
//   fontWeight: 'bold',
// };

function Quantity(props) {
  const [quantities, setQuantities] = useState(['-']);

  const handleChange = (event) => {
    props.setCurrentQuantity(event.target.value);
  };

  useEffect(() => {
    if (props.inStockQuantity !== -1) {
      if (props.inStockQuantity >= 15) {
        setQuantities([...Array(15 + 1).keys()].slice(1));
      } else {
        setQuantities([...Array(props.inStockQuantity + 1).keys()].slice(1));
      }
    } else {
      setQuantities(['-']);
    }
  }, [props.inStockQuantity]);

  return (
    <div style={styles}>
      <div>Quantity</div>
      <select style={{ width: '40px', height: '25px'}} onChange={handleChange}>
        {quantities.map((quantity) => (
          <option value={quantity}>{quantity}</option>
        ))}
      </select>
    </div>
  );
}

export default Quantity;
