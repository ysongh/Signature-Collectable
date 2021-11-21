// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

contract SignatureCollectable {
  mapping(address => Signatures) public signatureCollections;
  struct Signatures {
    address user;
    string[] imageList;
  }

  event SignatureLog (
     address user,
     string[] imageList
  );

  constructor() public {
  }

  function addImageToCollection(address sender, string[] memory _urls) public {
    signatureCollections[sender].imageList = _urls;

    emit SignatureLog(sender, signatureCollections[sender].imageList);
  }

  function getSignatureImages(address sender) public view returns (string [] memory){
    return signatureCollections[sender].imageList;
  }
}
