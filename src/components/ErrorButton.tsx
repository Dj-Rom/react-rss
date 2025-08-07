import React from 'react';

type Props = {
  onClick?: () => void;
};

const ErrorButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button id="errorButton" onClick={onClick} style={{ marginTop: '2rem' }}>
      Trigger Error
    </button>
  );
};

export default ErrorButton;
