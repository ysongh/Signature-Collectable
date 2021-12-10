import * as UAuthWeb3Modal from '@uauth/web3modal';
import UAuthSPA from '@uauth/js';
import Web3Modal from "web3modal";

import {
    UNSTOPPABLEDOMAINS_CLIENTID,
    UNSTOPPABLEDOMAINS_CLIENTSECRET,
    UNSTOPPABLEDOMAINS_REDIRECT_URI,
    UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI
  } from '../config';

// These options are used to construct the UAuthSPA instance.
export const uauthOptions = {
  clientID: UNSTOPPABLEDOMAINS_CLIENTID,
  clientSecret: UNSTOPPABLEDOMAINS_CLIENTSECRET,
  redirectUri: UNSTOPPABLEDOMAINS_REDIRECT_URI,
  postLogoutRedirectUri: UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI,

  // Must include both the openid and wallet scopes.
  scope: 'openid wallet',
}

const providerOptions = {
  'custom-uauth': {
    // The UI Assets
    display: UAuthWeb3Modal.display,

    // The Connector
    connector: UAuthWeb3Modal.connector,

    // The SPA libary
    package: UAuthSPA,

    // The SPA libary options
    options: uauthOptions,
  },

  // Include any other web3modal providers here too...
}

export const web3modal = new Web3Modal({providerOptions});

// Register the web3modal so the connector has access to it.
UAuthWeb3Modal.registerWeb3Modal(web3modal);