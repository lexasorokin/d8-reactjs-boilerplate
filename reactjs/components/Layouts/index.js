import React from 'react';
import PropTypes from 'prop-types';
import GlobalHeader from '../GlobalHeader';
import GlobalFooter from '../GlobalFooter';
import ProgressBar from '../ProgressBar';

const DefaultLayout = ({ children }) => (
  <div>
    <GlobalHeader />
    { children }
    <GlobalFooter />
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.node
  ).isRequired,
};

export default DefaultLayout;
