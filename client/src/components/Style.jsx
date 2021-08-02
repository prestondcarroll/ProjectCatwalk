/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import React from 'react';
import { FaCheck } from 'react-icons/fa';

const styles = {
  card: {
    height: '150px',
    width: '100px',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50px',
    border: '3px solid #525252',
  },
};

const getStylePrice = (data) => {
  if (data.sale_price === null) {
    return data.original_price;
  }
  return data.sale_price;
};

function Style(props) {

  const handleStyleChange = () => {
    props.changeStyle(props.style);
    props.changePrice(getStylePrice(props.style));
  };

  //if a style is currently selected put the checkmark on top of the image
  if (props.currentStyleID !== undefined && props.currentStyleID === props.style.style_id) {
    return (
      <div onClick={handleStyleChange} style={{ ...styles.card }}>
        <span style={{ display: 'inline-block', position: 'relative' }}>
          <img
            textAnchor="middle"
            alignmentBaseline="middle"
            style={styles.image}
            src={props.style.photos[0].thumbnail_url}
            alt="no_img"
          />

          <FaCheck
            size={30}
            textAnchor="middle"
            alignmentBaseline="middle"
            style={{
              fill: '#a7ffa4', position: 'absolute', left: '.01em', bottom: '.25em',
            }}
          />
        </span>
      </div>
    );
  }
  //else return image with no checkmark on it
  return (
    <div onClick={handleStyleChange} style={{ ...styles.card }}>
      <img style={styles.image} src={props.style.photos[0].thumbnail_url} alt="no_img" />
    </div>
  );
}

export default Style;
