import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

// styles
import './styles.scss';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div>
        <Skeleton variant="rect" width={258} height={297} />
      </div>
      <div>
        <Skeleton variant="rect" width={258} height={297} />
      </div>
      <div>
        <Skeleton variant="rect" width={258} height={297} />
      </div>
      <div>
        <Skeleton variant="rect" width={258} height={297} />
      </div>
      <div>
        <Skeleton variant="rect" width={258} height={297} />
      </div>
      <div>
        <Skeleton variant="rect" width={258} height={297} />
      </div>
      <div>
        <Skeleton variant="rect" width={258} height={297} />
      </div>
      <div>
        <Skeleton variant="rect" width={258} height={297} />
      </div>
      <div>
        <Skeleton variant="rect" width={258} height={297} />
      </div>
      <div>
        <Skeleton variant="rect" width={258} height={297} />
      </div>
    </div>
  );
};

export default Loading;
