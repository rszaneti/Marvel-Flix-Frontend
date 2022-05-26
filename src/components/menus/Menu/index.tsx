import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

// Context
import { useActiveMenu } from '../../../context/ActiveMenuContext';

// Styles
import './styles.scss';
import '../../../styles/global.scss';

// JSON
import menuItens from './menuItens';

const Menu: React.FC = () => {
  const { activeMenu, handleActiveMenu } = useActiveMenu();

  const handleActiveId = useCallback(
    (id: string) => {
      handleActiveMenu(id);
    },
    [handleActiveMenu],
  );

  return (
    <ul className="menu-list">
      {menuItens.map(m => (
        <li
          key={m.id}
          onClick={() => handleActiveId(m.id)}
          aria-hidden="true"
          className="menu-list-li"
        >
          <Link to={m.to}>
            <p
              className={`menu-text ${
                activeMenu === m.id ? 'menu-text-active' : ''
              }`}
            >
              {m.name}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
