import useWindowWidth from 'hooks/UseWindowWidth';
import { useNavigate } from 'react-router-dom';

import Text from '../Text';

import styles from './Header.module.scss';
import headerIcon from './icons/header_logo.svg';
import headerProfile from './icons/header_profile.svg';
import headerRecipes from './icons/header_recipes.svg';

const Header = () => {
  const width = useWindowWidth();
  const navigate = useNavigate();
  const navView = width < 480 ? 'p-10' : width < 768 ? 'p-14' : 'p-16';
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div
          className={styles.header__logo}
          onClick={() => {
            navigate('/');
          }}
        >
          <img src={headerIcon} className="header__logo-img" />
          <Text view="p-20" weight="bold" color="primary" className="header__logo-text">
            Food Client
          </Text>
        </div>

        <div className={styles.header__nav}>
          <Text
            view={navView}
            color="accent"
            className="header__nav-item"
            onClick={() => navigate('/recipes')}
          >
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
          <img src={headerRecipes} className="header__profile-recipes" />
          <img src={headerProfile} className="header__profile-profile" />
        </div>
      </div>
    </div>
  );
};

export default Header;
