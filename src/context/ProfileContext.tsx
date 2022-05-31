import React, { createContext, useCallback, useState, useContext } from 'react';

interface IProfile {
  name: string;
  email: string;
}

interface IProfileContextState {
  profile: IProfile;
  insert(data: IProfile): void;
  reset(): void;
}

const ProfileContext = createContext<IProfileContextState>(
  {} as IProfileContextState,
);

const ProfileProvider: React.FC = ({ children }) => {
  const [dataProfile, setDataProfile] = useState<IProfile>({} as IProfile);

  const insert = useCallback((data: IProfile) => {
    setDataProfile(data);
  }, []);

  const reset = useCallback(() => {
    setDataProfile({} as IProfile);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile: dataProfile,
        insert,
        reset,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

function useProfile(): IProfileContextState {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within an ProfileProvider');
  }

  return context;
}

export { ProfileProvider, useProfile };
