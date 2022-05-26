import React from 'react';
import { useParams } from 'react-router-dom';

// Pages
import Comics from '../channel/Comics';
import Characters from '../channel/Characters';
import Creators from '../channel/Creators';

// Styles
import './styles.scss';

interface IParamTypes {
  channel: string;
}

const Home: React.FC = () => {
  const { channel } = useParams<IParamTypes>();

  return (
    <div className="home-container">
      {channel === 'characters' ? (
        <>
          <Characters channel="characters" />
        </>
      ) : channel === 'creators' ? (
        <>
          <Creators channel="creators" />
        </>
      ) : (
        <>
          <Comics channel="comics" />
        </>
      )}
    </div>
  );
};

export default Home;
