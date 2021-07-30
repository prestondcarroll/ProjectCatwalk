/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

function Size(props) {
  // const [sizes, setSizes] = useState(['Select Size']);
  const handleChange = (event) => {
    props.setCurrentSize(event.target.value);
  };

  useEffect(() => {
    // setSizes(props.sizes);
    const dropDown = document.getElementById('sizeSelect');
    dropDown.selectedIndex = 0;
  }, [props.sizes]);

  if (props.sizes[1] === undefined || props.sizes[1] === null) {
    return (
      <div>
        <h3>Size</h3>
        <select id="sizeSelect">
          <option value="Out Of Stock">Out Of Stock</option>
        </select>

      </div>
    );
  }

  return (
    <div>
      <h3>Size</h3>
      <select id="sizeSelect" onChange={handleChange}>
        {props.sizes.map((size) => (
          <option value={size}>{size}</option>
        ))}
      </select>

    </div>
  );
}

export default Size;
