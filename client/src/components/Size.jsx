/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function Size(props) {
  // const [sizes, setSizes] = useState(['Select Size']);
  const [sizeOptions, setSizeOptions] = useState([{ value: 'Loading', label: 'Loading' }]);

  useEffect(() => {
    const newSizeOptions = [];
    props.sizes.forEach((size) => {
      newSizeOptions.push({ value: size, label: size });
    });
    setSizeOptions(newSizeOptions);
  }, [props.sizes]);

  const onInputChange = (options, { action }) => {
    if (action === 'menu-close') {
      props.setIsMenuOpen(false);
    }
  };

  const onChange = (selectedOption) => {
    props.setCurrentSize(selectedOption.value);
    props.selectRef.blur();
  };

  if (props.sizes[1] === undefined || props.sizes[1] === null) {
    return (
      <div>
        <h6>{props.sizeMessage}</h6>
        <Select
          ref={(r) => {
            props.setSelectRef(r);
          }}
          id="sizeSelect"
          options={sizeOptions}
          onClick={props.openMenu}
          onFocus={props.openMenu}
          onInputChange={onInputChange}
          onChange={onChange}
          menuIsOpen={props.isMenuOpen}
        />

      </div>
    );
  }

  return (
    <div>
      <h3>{props.sizeMessage}</h3>
      <Select
        ref={(r) => {
          props.setSelectRef(r);
        }}
        id="sizeSelect"
        options={sizeOptions}
        onFocus={props.openMenu}
        onInputChange={onInputChange}
        onChange={onChange}
        menuIsOpen={props.isMenuOpen}
      />

    </div>
  );
}

export default Size;
