import React, { createContext, useCallback, useState, useContext } from 'react';

interface IDeselectAllContext {
  deselectAll: boolean;
  handleDeselectAll(): void;
}

const DeselectAllContext = createContext<IDeselectAllContext>(
  {} as IDeselectAllContext,
);

const DeselectAllProvider: React.FC = ({ children }) => {
  const [deselectAll, setDeselectAll] = useState(false);

  // Modal
  const handleDeselectAll = useCallback(() => {
    setDeselectAll(!deselectAll);
  }, [deselectAll]);

  return (
    <DeselectAllContext.Provider
      value={{
        deselectAll,
        handleDeselectAll,
      }}
    >
      {children}
    </DeselectAllContext.Provider>
  );
};

function useDeselectAll(): IDeselectAllContext {
  const context = useContext(DeselectAllContext);

  if (!context) {
    throw new Error(
      'useDeselectAll must be used within an DeselectAllProvider',
    );
  }

  return context;
}

export { DeselectAllProvider, useDeselectAll };
