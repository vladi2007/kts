import React from 'react';
import './Loader.css';
import loaderSvg from './loader.svg';

export type LoaderProps = {
  size?: 's' | 'm' | 'l';
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ className = '', size = 'l' }) => {
  return (
    <div className={`loader ${className} ${size}`}>
      <img src={loaderSvg} className={`loader-img ${size}`} alt="loading" />
    </div>
  );
};


export default Loader;
