import axios from 'axios';
import Button from 'components/Button';
import Card from 'components/Card';
import Input from 'components/Input';
import MultiDropdown, { type Option } from 'components/MultiDropdown';
import Text from 'components/Text';
import { STRAPI_BASE_URL } from 'config/api.config';
import useWindowWidth from 'hooks/UseWindowWidth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type RecipeData, type Ingredient } from 'types/Recipes';

import { CATEGORY_OPTIONS } from './Recipes.config';
import styles from './Recipes.module.scss';
import inputIcon from './icons/input_icon.svg';
import recipesImage from './icons/recipes_image.svg';

const Recipes = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const [recipes, setRecipes] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const width = useWindowWidth();
  const navView = width < 480 ? 'p-12' : width < 768 ? 'p-14' : 'p-20';

  useEffect(() => {
    // Запрос к Strapi
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ data: RecipeData[] }>(
          `${STRAPI_BASE_URL}/recipes?populate[0]=images&populate[1]=ingradients`,
          {}
        );

        setRecipes(response.data.data);
      } finally {
        setLoading(false);
      }
    };
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
            onChange={(val: string) => setSearchValue(val)}
            placeholder="Enter dishes"
            className={styles.recipes__finder_input}
          />
          <Button>
            <img src={inputIcon} alt="search" />
          </Button>
        </div>

        <MultiDropdown
          className={styles.recipes__categories}
          options={CATEGORY_OPTIONS}
          value={selectedCategories}
          onChange={(val: Option[]) => setSelectedCategories(val)}
          getTitle={(val: Option[]) =>
            val.length > 0 ? val.map((v) => v.value).join(', ') : 'Categories'
          }
        />
        {!loading && (
          <div className={styles.recipes__cards}>
            {recipes?.map((r: RecipeData) => {
              const ingredients = r.ingradients
                .map((i: Ingredient) => `${i.unit} ${i.name}`)
                .join(' + ');

              return (
                <Card
                  onClick={() => navigate(`/recipe/${r.documentId}`)}
                  className={styles.recipes_cards_card}
                  key={r.id}
                  image={r.images[0]?.formats?.medium?.url}
                  title={r.name}
                  subtitle={` ${r.totalTime} min`}
                  contentSlot={`${ingredients} `}
                  callories={r.calories + ' kcal'}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
