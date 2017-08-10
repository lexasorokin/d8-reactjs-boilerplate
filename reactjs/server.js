const compression = require('compression');
const express = require('express');
const nextjs = require('next');
const sass = require('node-sass');

// Load environment variables from .env file if present
// require('dotenv').load();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;

const dev = process.env.NODE_ENV !== 'production';
const app = nextjs({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // Serve gzipped content where possible.
    server.use(compression());

    // Add route to serve compiled SCSS from /assets/{build id}/main.css
    // Note: This is only used in production, in development css is inline.
    const sassResult = sass.renderSync({ file: './styles/theme.scss', outputStyle: 'compressed' });
    server.get('/assets/:id/main.css', (req, res) => {
      res.setHeader('Content-Type', 'text/css');
      res.setHeader('Cache-Control', 'public, max-age=2592000');
      res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
      res.send(sassResult.css);
    });

    // Send robots.txt file from /static folder.
    const options = {
      root: __dirname + '/static/',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      }
    };
    server.get('/robots.txt', (req, res) => (
      res.status(200).sendFile('robots.txt', options)
    ));

    // Set browser caching for all static files.
    server.use('/static', express.static(__dirname + '/static', {
      maxAge: '7d'
    }));

    // Reroute all /blog/[alias] requests to /blog-post.js file.
    //server.get('/blog/:path', (req, res) => (
    //  app.render(req, res, '/blog-post', req.params)
    //));

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => (
      handle(req, res)
    ));

    server.listen(process.env.PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${process.env.PORT} [ ${process.env.NODE_ENV} ]`);
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
