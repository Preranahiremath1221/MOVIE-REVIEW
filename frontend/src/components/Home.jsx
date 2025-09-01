import React from 'react';
import { assets } from '../assets';

function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${assets.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  return (
    <div className="home" style={backgroundStyle}></div>
  );
}

export default Home;
