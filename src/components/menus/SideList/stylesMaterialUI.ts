import { makeStyles } from '@material-ui/core/styles';

const useSideListStyles = makeStyles(theme => ({
  listItemText: {
    fontSize: '1.6rem',
  },
  list: {
    width: 280,
  },
  drawerHeader: {
    position: 'relative',
    margin: theme.spacing(0, 1),
    left: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default useSideListStyles;
