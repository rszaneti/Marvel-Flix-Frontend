import React from 'react';

import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';

import './styles.scss';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
