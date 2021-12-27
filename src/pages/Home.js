import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Alert from '../components/common/Alert';

function Home({ user, uauth, account, setAccount }) {
  const router = useHistory();

  useEffect(() => {
    if (user || account) router.push('/dashboard');
  }, [user, account])

  const loginWithUnstoppableDomains = async () => {
    try {
      const authorization = await uauth.loginWithPopup();
   
      console.log(authorization);
      setAccount(authorization.idToken.sub);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Alert />
      <header>
        <div className="container">
          <div className="row py-5">
            <div className="col-12 col-md-6 mb-5">
              <h1 className="mt-4 mb-4">Digital Collection of Signatures </h1>
              <p className="mb-4">Collect signatures from friends, family, or other and store them on IPFS </p>
              <button className="btn btn-sm" onClick={loginWithUnstoppableDomains}>
                <img src="/unstoppable-default-button.png" alt="Unstoppable Button" width={300} />
              </button>
              <button className="btn btn-success" onClick={() => router.push('./howitworks')}>
                How it works
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