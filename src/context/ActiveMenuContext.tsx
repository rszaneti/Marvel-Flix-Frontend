import React, { createContext, useCallback, useState, useContext } from 'react';

interface IActiveMenuContext {
  activeMenu: string;
  handleActiveMenu(id: string): void;
}

const ActiveMenuContext = createContext<IActiveMenuContext>(
  {} as IActiveMenuContext,
);

const ActiveMenuProvider: React.FC = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('1');

  // Modal
  const handleActiveMenu = useCallback((id: string) => {
    setActiveMenu(id);
  }, []);

  return (
    <ActiveMenuContext.Provider
      value={{
        activeMenu,
        handleActiveMenu,
      }}
    >
      {children}
    </ActiveMenuContext.Provider>
  );
};

function useActiveMenu(): IActiveMenuContext {
  const context = useContext(ActiveMenuContext);

  if (!context) {
    throw new Error('useActiveMenu must be used within an ActiveMenuProvider');
  }

  return context;
}

export { ActiveMenuProvider, useActiveMenu };
