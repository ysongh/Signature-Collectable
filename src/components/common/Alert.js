import React from 'react';

function Alert() {
  return (
    <div className="container">
      <div className="alert alert-info alert-dismissible fade show" role="alert">
        Contract is deployed on Rinkeby Test Network
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  )
}

export default Alert;
