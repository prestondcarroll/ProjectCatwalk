import React from 'react';
import { FaCheck, FaCircle } from 'react-icons/fa';

const styles = {
  height: '100%',
  width: '100%',
  position: 'relative',
};

function Thumbnail(props) {
  const handleThumbClick = () => {
    props.setCurrentImageIdx(props.imageIdx);
  };

  if (props.imageIdx === props.currentImageIdx) {
    return (
      <div onClick={handleThumbClick} style={styles}>
        <span>

          <FaCircle
            size={30}
            style={{
              fill: '#17a1b3', position: 'absolute', left: '-0.5em', bottom: '2.65em',
            }}
          />
        </span>
      </div>
    );
  }

  return (
    <div onClick={handleThumbClick} style={styles}>
      <FaCircle
        size={15}
        style={{
          fill: '#17a1b3',
        }}
      />
    </div>
  );
}

export default Thumbnail;
