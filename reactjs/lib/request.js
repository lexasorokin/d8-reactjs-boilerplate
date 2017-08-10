import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import superagentPrefix from 'superagent-prefix';
import { BACKEND_SERVER_URL, BACKEND_CLIENT_URL } from './url';

const backendURL = typeof window === 'undefined' ? BACKEND_SERVER_URL : BACKEND_CLIENT_URL;
const prefix = superagentPrefix(backendURL);

superagentJsonapify(superagent);

export {
  superagent,
  prefix,
};
