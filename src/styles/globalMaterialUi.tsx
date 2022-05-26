/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  lighten,
  makeStyles,
  withStyles,
  createStyles,
} from '@material-ui/core/styles';
import {
  FormControl,
  FormLabel,
  TextField,
  Checkbox,
  CheckboxProps,
  RadioGroup,
  Radio,
  RadioProps,
  Tooltip,
  AppBar,
  Tabs,
  Tab,
  TabProps,
  Box,
  TableRow,
  /* LinearProgress,
  Modal,
  Fade, */
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

/* Form Labels */
export const CssFormControl = withStyles({
  root: {
    color: '#3d3d3d',
  },
})(FormControl);

export const CssFormLabel = withStyles({
  root: {
    color: '#3d3d3d',
  },
})(FormLabel);

/* Layers */
export const CssTextField = withStyles({
  root: {
    width: '100%',
    marginTop: '12px',

    '& label': {
      color: '#3d3d3d',
      fontSize: '1.6rem',
      background: '#ffffff',
      marginLeft: '-5px',
      padding: '0 10px',
      borderRadius: '2px',
    },
    '& label.Mui-focused': {
      color: '#3d3d3d',
      background: '#ffffff',
      marginLeft: '-5px',
      padding: '0 10px',
      borderRadius: '2px',
    },
    '& legend': {
      fontSize: '1.2rem',
    },
    '& .MuiInputBase-root': {
      fontSize: '1.6rem',
      color: '#3d3d3d',
      background: '#ffffff',
    },
    '& .MuiSelect-icon': {
      top: 'calc(50% - 10px)',
    },
    '& .MuiSvgIcon-root': {
      width: '1.6rem',
      height: '1.6rem',
      fontSize: '1.6rem',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ffffff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#000000',
      },
      '&:hover fieldset': {
        boxShadow: '2px 5px 10px 3px rgba(0, 0, 0, 0.4);',
        borderColor: '#000000',
        transition: 'boxShadow 0.2s',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000000',
      },
    },
    '& .MuiFormHelperText-root': {
      fontSize: '1.2rem',
    },
  },
})(TextField);

export const CssCheckBox = withStyles({
  root: {
    marginLeft: '10px',
    color: '#3d3d3d',
    height: '100%',
    alignItems: 'center',
    '&$checked': {
      color: '#201e1e',
    },
    '& .MuiSvgIcon-root': {
      width: '2rem',
      height: '2rem',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export const CssRadioGroup = withStyles({
  root: {
    color: '#3d3d3d',
    height: '100%',
    alignItems: 'center',
    '& .MuiTypography-body1': {
      fontSize: '1.6rem',
    },
  },
})(RadioGroup);

export const CssRadio = withStyles({
  root: {
    marginLeft: '10px',
    color: '#3d3d3d',
    '&$checked': {
      color: '#201e1e',
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

/* Tooltip Customizado */
export const CssTooltip = withStyles({
  tooltip: {
    maxWidth: 220,
    fontSize: '1.4rem',
  },
})(Tooltip);

/* Table */
export const CssTableToolbarStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    '& .MuiTypography-subtitle1': {
      fontSize: '1.6rem',
    },
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  link: {
    borderRadius: '8px !important',
    fontSize: '1.6rem',
    color: '#201e1e',
  },
  filter: {
    borderRadius: '8px !important',
    fontSize: '1.6rem',
    color: '#3d3d3d',
  },
}));

export const CssTableStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow:
      '2px 1px 8px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12) !important',
  },
  table: {
    minWidth: 750,
  },
  tableHead: {
    background: '#eee',
  },
  tableCellHead: {
    fontSize: '1.6rem',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  tableCell: {
    fontSize: '1.4rem',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
  },
  caption: {
    fontSize: '1.4rem',
  },
  select: {
    fontSize: '1.4rem !important',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export const CssTableRowColorInterspersed = withStyles(() =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#eee',
      },
    },
  }),
)(TableRow);

/* Styles Geral Tabs */
export const CssBox = withStyles({
  root: {},
})(Box);

export const CssAppBar = withStyles({
  root: {
    boxShadow: '0px 9px 9px -6px rgba(0,0,0,0.12)',
    transform: 'none',
  },
})(AppBar);

export const CssTabs = withStyles({
  root: {
    backgroundColor: '#fff',
    borderRadius: '8px 8px 0 0',
  },
  indicator: {
    backgroundColor: '#ed3237',
  },
})(Tabs);

export const CssTab = withStyles(() => ({
  root: {
    textTransform: 'uppercase',
    minWidth: 72,
    fontWeight: 400,
    fontSize: '1.6rem',
    marginRight: '10px',
    color: '#3d3d3d',
    '&:hover': {
      color: '#3d3d3d',
      opacity: 1,
    },
    '&$selected': {
      color: '#3d3d3d',
      fontWeight: 600,
    },
    '&:focus': {
      color: '#3d3d3d',
    },
  },
  selected: {},
}))((props: TabProps) => <Tab disableRipple {...props} />);

/* Pagination */
export const CssPagination = withStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    '& .MuiPaginationItem-root': {
      fontSize: '1.6rem',
      color: '#ffffff',
    },
    '& .MuiPaginationItem-outlined': {
      border: '1px solid rgba(255, 255, 255, 0.8)',
    },
    '& .MuiPaginationItem-page:hover': {
      backgroundColor: '#ed3237',
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: '#ed3237',
    },
  },
}))(Pagination);

/* Styles Modal */
export const CssModalStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#3d3d3d',
    border: '0',
    borderRadius: '8px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: 'scroll',
    top: '5%',
    width: '100%',
    maxHeight: '90vh',
    maxWidth: '1024px',
  },
}));
