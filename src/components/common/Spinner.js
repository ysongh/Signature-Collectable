import React from 'react';

function Spinner() {
  return (
    <div className="text-center my-4">
      <div className="spinner-grow text-primary" role="status" style={{ width: '3.5rem', height: '3.5rem'}}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner;
