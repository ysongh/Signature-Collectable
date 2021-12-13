import React from 'react';

function Footer(){
  return(
    <footer className="bg-primary p-4 text-center text-white mt-5">
      &copy;{new Date().getFullYear()} Signature Collectable
    </footer>
  );
}

export default Footer;