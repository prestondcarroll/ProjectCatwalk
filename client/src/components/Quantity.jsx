/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

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
    <div>
      <h3>Quantity</h3>
      <select onChange={handleChange}>
        {quantities.map((quantity) => (
          <option value={quantity}>{quantity}</option>
        ))}
      </select>

    </div>
  );
}

export default Quantity;
