import React, { Fragment, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@material-ui/core';

import { FaBars } from 'react-icons/fa';
import { BiChevronRightCircle } from 'react-icons/bi';

// Context
import { useActiveMenu } from '../../../context/ActiveMenuContext';

// Styles
import { CssTooltip } from '../../../styles/globalMaterialUi';
import useSideListStyles from './stylesMaterialUI';
import './styles.scss';

// JSON
import menuItens from '../Menu/menuItens';

const SideList: React.FC = () => {
  const classes = useSideListStyles();

  // Context
  const { activeMenu, handleActiveMenu } = useActiveMenu();

  // State
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleListItemClick = useCallback(
    index => {
      handleActiveMenu(index);

      handleDrawerClose();
    },
    [handleDrawerClose, handleActiveMenu],
  );

  const sideList = (
    <div className={classes.list} role="presentation">
      <List>
        <div className={classes.drawerHeader}>
          <CssTooltip title="RECOLHER MENU">
            <IconButton
              size="small"
              aria-label="RECOLHER MENU"
              onClick={handleDrawerClose}
            >
              <BiChevronRightCircle
                className="side-list-icon-close"
                size="30"
              />
            </IconButton>
          </CssTooltip>
        </div>
      </List>
      <List>
        {menuItens.map(m => (
          <Fragment key={m.id}>
            <ListItem
              button
              disabled={!m.active}
              key={m.id}
              selected={activeMenu === m.id}
              component={Link}
              to={m.to}
              onClick={() => {
                handleListItemClick(m.id);
              }}
            >
              <ListItemText
                primary={m.name}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <CssTooltip title="ABRIR MENU">
        <IconButton
          size="small"
          aria-label="ABRIR MENU"
          onClick={handleDrawerOpen}
        >
          <FaBars
            className="side-list-icon-bars"
            aria-label="ABRIR MENU"
            size="30"
          />
        </IconButton>
      </CssTooltip>

      <Drawer variant="persistent" anchor="right" open={open}>
        {sideList}
      </Drawer>
    </>
  );
};

export default SideList;
