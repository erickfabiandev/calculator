import React from 'react';
import './Screen.scss';

interface propsScreen {
  currentValue: string;
}

const Screen: React.FC<propsScreen> = ({ currentValue }) => {
  return (
    <div className='screen'>
      {currentValue}
    </div>
  );
};

export default Screen;