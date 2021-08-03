import React from 'react';

function AddToOutfit(props) {
  return (
    <div onClick={(event) => {props.trackPageView(event.target.outerHTML, 'Overview')}}>
      <h3>AddToOutfit</h3>


    </div>
  );
}

export default AddToOutfit;
