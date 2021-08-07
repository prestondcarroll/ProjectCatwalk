import React from 'react';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function AddToOutfit(props) {
  return (
    <div style={styles}>
      <h3 onClick={props.handleAddOutfits}>AddToOutfit</h3>


    </div>
  );
}

export default AddToOutfit;
