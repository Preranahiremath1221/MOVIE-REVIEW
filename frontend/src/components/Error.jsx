import React from 'react';

const Error = ({ message }) => {
  return (
    <div className="error">
      <h2>Oops! Something went wrong</h2>
      <p>{message || 'An unexpected error occurred. Please try again later.'}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
};

export default Error;
