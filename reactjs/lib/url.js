
// URL of local backend. Needed to make requsts from the client
// browser.
const DEV_BACKEND_CLIENT_URL = 'http://drupal.docker.localhost';

// URL of live backend. Needed to make requsts from the client
// browser.
const LIVE_BACKEND_CLIENT_URL = 'http://example.com';

// Internal docker url. Needed to make request from nodejs server to
// the backend.
const BACKEND_SERVER_URL = 'http://nginx';

// Figure out which client URL to use.
const BACKEND_CLIENT_URL = process.env.NODE_ENV !== 'production' ? DEV_BACKEND_CLIENT_URL : LIVE_BACKEND_CLIENT_URL;

// Small function which convers relative urls like "/sites/detault/files/img.jpg"
// to absolute urls with reference to the backend.
const fileURL = relativeURL => (
  BACKEND_CLIENT_URL + relativeURL
);

export {
  BACKEND_CLIENT_URL,
  BACKEND_SERVER_URL,
  fileURL,
};
