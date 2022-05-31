import React, { createContext, useCallback, useState, useContext } from 'react';

interface IChannelSelectedItems {
  id: number;
  channel: string;
  title: string;
  description: string;
  thumbnail: string;
  modified: string;
  pageCount: number;
  issueNumber: number;
}

interface IChannelSelectedItemsContextState {
  channelSelectedItems: IChannelSelectedItems[];
  insert(data: IChannelSelectedItems[]): void;
  reset(): void;
}

const ChannelSelectedItemsContext = createContext<IChannelSelectedItemsContextState>(
  {} as IChannelSelectedItemsContextState,
);

const ChannelSelectedItemsProvider: React.FC = ({ children }) => {
  const [dataChannelSelectedItems, setDataChannelSelectedItems] = useState<
    IChannelSelectedItems[]
  >([]);

  const insert = useCallback((data: IChannelSelectedItems[]) => {
    setDataChannelSelectedItems(data);
  }, []);

  const reset = useCallback(() => {
    setDataChannelSelectedItems([]);
  }, []);

  return (
    <ChannelSelectedItemsContext.Provider
      value={{
        channelSelectedItems: dataChannelSelectedItems,
        insert,
        reset,
      }}
    >
      {children}
    </ChannelSelectedItemsContext.Provider>
  );
};

function useChannelSelectedItems(): IChannelSelectedItemsContextState {
  const context = useContext(ChannelSelectedItemsContext);

  if (!context) {
    throw new Error(
      'useChannelSelectedItems must be used within an ChannelSelectedItemsProvider',
    );
  }

  return context;
}

export { ChannelSelectedItemsProvider, useChannelSelectedItems };
