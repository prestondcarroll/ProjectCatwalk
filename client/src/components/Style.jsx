/* eslint-disable import/extensions */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import React from 'react';

//size 12 string
const test = 'Forest Green & Black';

function Style(props) {
  // const [reviewCount, setReviewCount] = useState('reviewCount');

  //make a circle with an image inside it

  return (
    <div style={{ ...styles.card }}>
      <img style={styles.image} src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" />
    </div>
  );
}

const styles = {
  card: {
    // position: 'relative',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    // margin: '5px',
    height: '100px',
    width: '100px',
    // backgroundColor: 'blue',
    // boderRadius: '50px',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50px',
  },
};

export default Style;
