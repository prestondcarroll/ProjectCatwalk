/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Size from './Size.jsx';
import Quantity from './Quantity.jsx';
import AddToCart from './AddToCart.jsx';
import AddToOutfit from './AddToOutfit.jsx';

const ParentWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 1em;
`;

const Parent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Child = styled.div`
  flex: 1 0 42%;
  margin: 5px;
  height: 100px;
  border: 3px solid #525252;
`;

function CartSelector(props) {
  const placeHolderSize = ['Loading'];
  const [currentSize, setCurrentSize] = useState('Select Size');
  const [currentQuantity, setCurrentQuantity] = useState('-');
  const [sizes, setSizes] = useState('sizes');
  const [inStockQuantity, setInStockQuantity] = useState(-1);
  const [sizeMessage, setSizeMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectRef, setSelectRef] = useState('');

  const openMenu = () => {
    selectRef.focus();
    setIsMenuOpen(true);
  };

  const getSizes = (style) => {
    const sizes = [];
    sizes.push('Select Size');
    Object.keys(style.skus).forEach((key) => {
      sizes.push(style.skus[key].size);
    });
    return sizes;
  };

  const getInStockQuantity = (style, size) => {
    let result = -1;
    Object.keys(style.skus).forEach((key) => {
      if (style.skus[key].size === size) {
        result = style.skus[key].quantity;
      }
    });
    return result;
  };

  useEffect(() => {
    const currentStyleLoaded = (props.currentStyle !== 'currentStyle' && props.currentStyle !== undefined);
    if (currentStyleLoaded) {
      setCurrentSize('Select Size');
      setInStockQuantity(-1);
      setCurrentQuantity('-');
      setSizes(getSizes(props.currentStyle));
    }
  }, [props.currentStyle]);

  useEffect(() => {
    const currentSizeLoaded = (currentSize !== 'Select Size' && currentSize !== undefined);
    if (currentSizeLoaded) {
      setInStockQuantity(getInStockQuantity(props.currentStyle, currentSize));
    }
  }, [currentSize]);

  const sizesLoaded = (sizes !== 'sizes' && sizes !== undefined);

  return (
    <div>
      <ParentWrapper>
        <Parent>
          <Child>
            <Size
              sizes={sizesLoaded ? sizes : placeHolderSize}
              sizeMessage={sizeMessage}
              setCurrentSize={setCurrentSize}
              setIsMenuOpen={setIsMenuOpen}
              isMenuOpen={isMenuOpen}
              openMenu={openMenu}
              selectRef={selectRef}
              setSelectRef={setSelectRef}
            />
          </Child>
          <Child>
            <Quantity
              inStockQuantity={inStockQuantity}
              setCurrentQuantity={setCurrentQuantity}
            />
          </Child>
          <Child>
            <AddToCart setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} openMenu={openMenu} />
          </Child>
          <Child><AddToOutfit /></Child>
        </Parent>
      </ParentWrapper>
    </div>
  );
}

export default CartSelector;
