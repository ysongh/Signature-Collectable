import React from 'react';

function Home() {
  return (
    <div>
      <header>
        <div className="container">
          <div className="row py-5">
            <div className="col-12 col-md-6 mb-5">
              <h1 className="mt-4 mb-4">Digital Collection of Signatures </h1>
              <p className="mb-4">Collect signatures from friends, family, or other and store them on IPFS </p>
              <button className="btn btn-primary btn-lg">
                Login with Unstoppable
              </button>
            </div>

            <div className="col-12 col-md-6">
              <img
                className="img-fluid"
                src="/hero.png"
                alt="Hero" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;