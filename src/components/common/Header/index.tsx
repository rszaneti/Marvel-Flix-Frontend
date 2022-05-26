import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Menu from '../../menus/Menu';
import SideList from '../../menus/SideList';

// Styles
import './styles.scss';

import logo from '../../../assest/images/logo-marvel-flix.png';

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <div className="logo">
        <Link to="/marvel-flix-frontend/">
          <img src={logo} alt="Marvel Flix" />
        </Link>
      </div>
      <nav>
        <div className="header-menu" data-testid="header-menu">
          <Menu />
        </div>
        <div className="header-side-list" data-testid="header-side-list">
          <SideList />
        </div>
      </nav>
    </div>
  );
};

export default Header;
