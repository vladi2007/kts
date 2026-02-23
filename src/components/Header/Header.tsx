import styles from './Header.module.scss';
import Text from '../Text';
import headerIcon from 'assets/icons/header_logo.svg';
import headerRecipes from 'assets/icons/header_recipes.svg';
import headerProfile from 'assets/icons/header_profile.svg';
import { useState, useEffect } from 'react';
const Header = () => {


 const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const width = useWindowWidth();

  // Определяем view в зависимости от ширины
  const navView = width < 480 ? 'p-12' : width < 768 ? 'p-14' : 'p-16';
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <img src={headerIcon} className="header__logo-img"></img>
          <Text view="p-20" weight="bold" color="primary" className="header__logo-text">
            Food Client
          </Text>
        </div>
        <div className={styles.header__nav}>
          <Text view={navView} color="accent" className="header__nav-item">
            Recipes
          </Text>
          <Text view={navView} color="primary" className="header__nav-item">
            Meals Categories
          </Text>
          <Text view={navView} color="primary" className="header__nav-item">
            Products
          </Text>
          <Text view={navView} color="primary" className="header__nav-item">
            Menu Items
          </Text>
          <Text view={navView} color="primary" className="header__nav-item">
            Meal Planning
          </Text>
        </div>
        <div className={styles.header__profile}>
          <img src={headerRecipes} className="header__profile-recipes"></img>
          <img src={headerProfile} className="header__profile-profile"></img>
        </div>
      </div>
    </div>
  );
};

export default Header;
