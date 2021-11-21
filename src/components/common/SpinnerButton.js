import React from 'react';

function SpinnerButton() {
  return (
    <button className="btn btn-primary btn-lg" type="button" disabled>
      <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      Pending...
    </button>
  )
}

export default SpinnerButton;
