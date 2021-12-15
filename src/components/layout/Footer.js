import React from 'react';

function Footer(){
  return(
    <footer className="bg-primary p-3 text-center text-white mt-5 fixed-bottom">
      &copy;{new Date().getFullYear()} Signature Collectable
    </footer>
  );
}

export default Footer;