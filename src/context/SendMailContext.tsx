import React, { createContext, useCallback, useState, useContext } from 'react';

interface ISendMailContext {
  openModalMailModalChannel: boolean;
  openModalMailChannel: boolean;
  openModalMailFooter: boolean;

  funcOpenModalMailModalChannel(open: boolean): void;
  funcOpenModalMailChannel(open: boolean): void;
  funcOpenModalMailFooter(open: boolean): void;
}

const SendMailContext = createContext<ISendMailContext>({} as ISendMailContext);

const SendMailProvider: React.FC = ({ children }) => {
  const [openModalMailModalChannel, setOpenModalMailModalChannel] = useState(
    false,
  );
  const [openModalMailChannel, setOpenModalMailChannel] = useState(false);
  const [openModalMailFooter, setOpenModalMailFooter] = useState(false);

  // Modal
  const funcOpenModalMailModalChannel = useCallback((open: boolean) => {
    setOpenModalMailModalChannel(open);
  }, []);

  const funcOpenModalMailChannel = useCallback((open: boolean) => {
    setOpenModalMailChannel(open);
  }, []);

  const funcOpenModalMailFooter = useCallback((open: boolean) => {
    setOpenModalMailFooter(open);
  }, []);

  return (
    <SendMailContext.Provider
      value={{
        openModalMailModalChannel,
        openModalMailChannel,
        openModalMailFooter,
        funcOpenModalMailModalChannel,
        funcOpenModalMailChannel,
        funcOpenModalMailFooter,
      }}
    >
      {children}
    </SendMailContext.Provider>
  );
};

function useSendMail(): ISendMailContext {
  const context = useContext(SendMailContext);

  if (!context) {
    throw new Error('useSendMail must be used within an SendMailProvider');
  }

  return context;
}

export { SendMailProvider, useSendMail };
