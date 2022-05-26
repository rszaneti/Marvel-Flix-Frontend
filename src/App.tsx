import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

// Routes
import Routes from './routes';

// Context
import { ActiveMenuProvider } from './context/ActiveMenuContext';
import { DeselectAllProvider } from './context/DeselectAllContext';
import { ErrorProvider } from './context/ErrorContext';
import { SendMailProvider } from './context/SendMailContext';

// Styles
import './styles/global.scss';

const theme = createTheme({}, ptBR);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ErrorProvider>
          <SendMailProvider>
            <ActiveMenuProvider>
              <DeselectAllProvider>
                <Routes />
              </DeselectAllProvider>
            </ActiveMenuProvider>
          </SendMailProvider>
        </ErrorProvider>
        <ToastContainer autoClose={4000} />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
