import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../../../components/Text/Text';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import MultiDropdown, { type Option } from '../../../components/MultiDropdown';
import axios from 'axios';
import styles from './Recipes.module.scss';
import recipesImage from 'assets/icons/recipes_image.svg';
import inputIcon from 'assets/icons/input_icon.svg';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru/api';

const Recipes = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
  const categoryOptions: Option[] = [
    { key: 'breakfast', value: 'Breakfast' },
    { key: 'lunch', value: 'Lunch' },
    { key: 'dinner', value: 'Dinner' },
  ];

  // хук для ширины окна
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
  const navView = width < 480 ? 'p-12' : width < 768 ? 'p-14' : 'p-20';

  // Запрос к Strapi
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${STRAPI_BASE_URL}/recipes?populate[0]=images&populate[1]=ingradients`, {
       
      });

      setRecipes(response.data.data);
    } catch (error) {
      console.error('Ошибка при получении рецептов', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className={styles.recipes}>
      <img src={recipesImage} className={styles.recipes__image} alt="Recipes" />

      <div className={styles.recipes__body}>
        <Text view={navView} weight="normal" className={styles.recipes__header}>
          Find the perfect food and drink ideas for every occasion, from weeknight dinners to
          holiday feasts.
        </Text>

        <div className={styles.recipes__finder}>
          <Input
            value={searchValue}
            onChange={(val) => setSearchValue(val)}
            placeholder="Enter dishes"
            className={styles.recipes__finder_input}
          />
          <Button>
            <img src={inputIcon} alt="search" />
          </Button>
        </div>

        <MultiDropdown
          className={styles.recipes__categories}
          options={categoryOptions}
          value={selectedCategories}
          onChange={(val) => setSelectedCategories(val)}
          getTitle={(val) => (val.length > 0 ? val.map((v) => v.value).join(', ') : 'Categories')}
        />
         {!loading && (
         <div className={styles.recipes__cards}>
          {recipes?.map((r) => {
            const recipe = r;
            const ingredients = recipe.ingradients
              .map((i: any) => `${i.unit} ${i.name}`)
              .join(' + ');

            return (
              <Card

               onClick={() => navigate(`/recipe/${r.documentId}`)}
              className={styles.recipes_cards_card}
                key={r.id}
                image={recipe.images[0]?.formats?.medium?.url }
                title={recipe.name}
                subtitle={` ${recipe.totalTime} min`}
                contentSlot={`${ingredients} `}
                callories={r.calories + ' kcal'}
              />
            );
          })}
        </div>)}
      </div>
    </div>
  );
};

export default Recipes;
