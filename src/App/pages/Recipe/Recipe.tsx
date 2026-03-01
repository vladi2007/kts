import axios from 'axios';
import Text from 'components/Text';
import { STRAPI_BASE_URL } from 'config/api.config';
import useWindowWidth from 'hooks/UseWindowWidth';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { type RecipeData, type Ingredient, type Equipment, type Direction } from 'types/Recipes';

import styles from './Recipe.module.scss';
import equip from './icons/equip_icon.svg';
import ingradient from './icons/ingradient_icon.svg';
import backImage from './icons/recipe_back_image.svg';
import recipeFonImage from './icons/recipe_fon_image.svg';
import stuffIcon from './icons/stuff_icon.svg';
const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const width = useWindowWidth();
  const navView = width < 480 ? 'p-16' : width < 1024 ? 'p-20' : 'title';

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ data: RecipeData }>(
          `${STRAPI_BASE_URL}/recipes/${id}?populate[0]=images&populate[1]=ingradients&populate[2]=equipments&populate[3]=directions`,
          {}
        );
        setRecipe(response.data.data);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);
  return (
    <>
      {!loading && (
        <div className={styles.recipe}>
          <img className={styles.recipe__fonImage} src={recipeFonImage} />
          <div className={styles.recipe__header} onClick={() => navigate('/recipes')}>
            <img src={backImage} className={styles.recipe__header_img} />
            <Text weight="bold" view={navView}>
              {recipe?.name}
            </Text>
          </div>
          <div className={styles.recipe__body}>
            <div className={styles.recipe__desc}>
              <img
                className={styles.recipe__desc_image}
                src={recipe?.images[0]?.formats?.small?.url}
              />
              <div className={styles.recipe__desc_stats}>
                <div className={styles.recipe__desc_stat}>
                  <Text view="p-16">Preparation</Text>
                  <Text view="p-16" color="accent">
                    {recipe?.preparationTime} minutes
                  </Text>
                </div>
                <div className={styles.recipe__desc_stat}>
                  <Text view="p-16">Cooking</Text>
                  <Text view="p-16" color="accent">
                    {recipe?.cookingTime} minutes
                  </Text>
                </div>
                <div className={styles.recipe__desc_stat}>
                  <Text view="p-16">Total</Text>
                  <Text view="p-16" color="accent">
                    {recipe?.totalTime} minutes
                  </Text>
                </div>
                <div className={styles.recipe__desc_stat}>
                  <Text view="p-16">Likes</Text>
                  <Text view="p-16" color="accent">
                    {recipe?.likes}
                  </Text>
                </div>
                <div className={styles.recipe__desc_stat}>
                  <Text view="p-16">Servings</Text>
                  <Text view="p-16" color="accent">
                    {recipe?.servings} servings
                  </Text>
                </div>
                <div className={styles.recipe__desc_stat}>
                  <Text view="p-16">Ratings</Text>
                  <Text view="p-16" color="accent">
                    {recipe?.rating}
                  </Text>
                </div>
              </div>
            </div>
            <Text tag="div" view="p-16" className={styles.recipe__summary}>
              <span dangerouslySetInnerHTML={{ __html: recipe?.summary || '' }} />
            </Text>
            <div className={styles.recipe__stuff}>
              <div className={styles.recipe__ingredients}>
                <Text weight="medium" view="p-20">
                  Ingredients
                </Text>
                <div>
                  {recipe?.ingradients?.map((ingredient: Ingredient) => (
                    <div key={ingredient.id}>
                      <img src={ingradient} />
                      <Text>
                        {' '}
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.recipe__divider}>
                <img src={stuffIcon} alt="divider" />
              </div>
              <div className={styles.recipe__equipment}>
                <Text weight="medium" view="p-20">
                  Equipment
                </Text>
                <div>
                  {recipe?.equipments?.map((equipment: Equipment) => (
                    <div key={equipment.id}>
                      {' '}
                      <img src={equip} />
                      <Text>{equipment.name}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.recipe__directions}>
              <Text view="p-20" weight="medium">
                Directions
              </Text>
              {recipe?.directions?.map((step: Direction, index: number) => (
                <div key={step.id} className={styles.recipe__steps}>
                  <Text view="p-16" weight="medium">
                    Step {index + 1}
                  </Text>
                  <Text view="p-14">{step.description}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Recipe;
