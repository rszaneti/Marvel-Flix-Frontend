import { createTheme } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { ptBR } from '@material-ui/core/locale';

const palette: PaletteOptions = {
  type: 'light',
  primary: {
    main: '#FF171F',
    contrastText: '#3d3d3d',
  },
};

const theme = createTheme(
  {
    palette,
  },
  ptBR,
);

export default theme;
