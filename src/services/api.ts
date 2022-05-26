import axios from 'axios';
import md5 from 'md5';

const pubkey = process.env.REACT_APP_PUBLIC_KEY || 'publick_key';
const prikey = process.env.REACT_APP_PRIVATE_KEY || 'private_key';
const ts = new Date().getTime();

const message = ts + prikey + pubkey;

const hash = md5(message);

export const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  params: {
    ts,
    apikey: pubkey,
    hash,
  },
});

export const apiMail = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_MAIL,
});
