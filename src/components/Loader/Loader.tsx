import React from 'react';

import styles from './Loader.module.scss';
import loaderSvg from './loader.svg';

export type LoaderProps = {
  size?: 's' | 'm' | 'l';
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ className = '', size = 'l' }) => {
  const loaderClassName = [styles.loader, className, styles[size]].filter(Boolean).join(' ');
  const imgClassName = [styles.loaderImg, styles[size]].filter(Boolean).join(' ');

  return (
    <div className={loaderClassName}>
      <img src={loaderSvg} className={imgClassName} alt="loading" />
    </div>
  );
};

export default Loader;
