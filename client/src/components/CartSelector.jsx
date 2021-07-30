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
  border: 1px solid black;
`;

const Parent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Child = styled.div`
  flex: 1 0 42%;
  margin: 5px;
  height: 100px;
`;

function CartSelector(props) {
  // state currentStyleID pass and use useEffect to have buttons refresh

  // get array of sizes and quantities from sku's

  // state for currentSize
  // state for currentQuantity

  // pass all sizes to size
  // pass inStockQuantity to quantity

  const placeHolderSize = ['Loading'];

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

  const [currentSize, setCurrentSize] = useState('Select Size');
  const [currentQuantity, setCurrentQuantity] = useState('-');
  const [sizes, setSizes] = useState('sizes');
  const [inStockQuantity, setInStockQuantity] = useState(-1);

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
              setCurrentSize={setCurrentSize}
            />
          </Child>
          <Child>
            <Quantity
              inStockQuantity={inStockQuantity}
              setCurrentQuantity={setCurrentQuantity}
            />
          </Child>
          <Child><AddToCart /></Child>
          <Child><AddToOutfit /></Child>
        </Parent>
      </ParentWrapper>
    </div>
  );
}

export default CartSelector;

// "product_id": "20100",
// "results": [
//     {
//         "style_id": 109986,
//         "name": "Forest Green & Black",
//         "original_price": "140.00",
//         "sale_price": null,
//         "default?": true,
//         "photos": [
//             {
//                 "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//                 "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
//             },
//             {
//                 "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//                 "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
//             },
//             {
//                 "thumbnail_url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//                 "url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
//             },
//             {
//                 "thumbnail_url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
//                 "url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
//             },
//             {
//                 "thumbnail_url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//                 "url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
//             },
//             {
//                 "thumbnail_url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//                 "url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
//             }
//         ],
//         "skus": {
//             "638231": {
//                 "quantity": 8,
//                 "size": "XS"
//             },
//             "638232": {
//                 "quantity": 16,
//                 "size": "S"
//             },
//             "638233": {
//                 "quantity": 17,
//                 "size": "M"
//             },
//             "638234": {
//                 "quantity": 10,
//                 "size": "L"
//             },
//             "638235": {
//                 "quantity": 15,
//                 "size": "XL"
//             },
//             "638236": {
//                 "quantity": 4,
//                 "size": "XL"
//             }
//         }
//     },
