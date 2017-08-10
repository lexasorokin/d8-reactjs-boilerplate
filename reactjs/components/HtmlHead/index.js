import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Package from '../../package';
import inlineCSS from '../../styles/theme.scss';

const HtmlHead = ({ pageTitle, metaDescription, metaKeywords }) => {
  let stylesheets;
  if (process.env.NODE_ENV === 'production') {
    // In production, serve pre-built CSS file from /assets/{version}/main.css
    const pathToCSS = `/assets/${Package.version}/main.css`;
    stylesheets = <link rel="stylesheet" type="text/css" href={pathToCSS} />;
  }
  else {
    // eslint-disable-next-line react/no-danger
    stylesheets = <style dangerouslySetInnerHTML={{ __html: inlineCSS }} />;
  }

  return (
    <Head>
      <title>{pageTitle} | BigBox.by</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="icon" type="image/png" href="/static/images/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="/static/images/favicon-16x16.png" sizes="16x16" />
      {stylesheets}
    </Head>
  );
};

HtmlHead.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  metaKeywords: PropTypes.string,
};

HtmlHead.defaultProps = {
  metaDescription: '',
  metaKeywords: '',
};

export default HtmlHead;
