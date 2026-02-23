import { useEffect, useState } from 'react';
import Text from '../../../components/Text';
import styles from './Recipe.module.scss';
import backImage from 'assets/icons/recipe_back_image.svg';
import ingradient from 'assets/icons/ingradient_icon.svg';
import stuffIcon from 'assets/icons/stuff_icon.svg';
import equip from 'assets/icons/equip_icon.svg';
import { useParams } from 'react-router-dom';
import recipeFonImage from 'assets/icons/recipe_fon_image.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipes] = useState<any>();
  const [loading, setLoading] = useState(false);
  const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru/api';
      const navigate = useNavigate();
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
  const navView = width < 480 ? 'p-16' : width < 1024 ? 'p-20' : 'title';
  // Запрос к Strapi
  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${STRAPI_BASE_URL}/recipes/${id}?populate[0]=images&populate[1]=ingradients&populate[2]=equipments&populate[3]=directions`,
        {}
      );
      setRecipes(response.data.data);
    } catch (error) {
      console.error('Ошибка при получении рецептов', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipe();
  }, []);
  return (
    <div className={styles.recipe}>
      <img className={styles.recipe__fonImage} src={recipeFonImage} />
      <div className={styles.recipe__header} onClick={() => navigate('/recipes')}>
        <img src={backImage} className={styles.recipe__header_img}></img>
        <Text weight="bold" view={navView}>
          {recipe?.name}
        </Text>
      </div>
      <div className={styles.recipe__body}>
        <div className={styles.recipe__desc}>
          <img
            className={styles.recipe__desc_image}
            src={recipe?.images[0]?.formats?.small?.url}
          ></img>
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
              {recipe?.ingradients?.map((ingredient: any ) => (
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
              {recipe?.equipments?.map((equipment: any) => (
                <div key={equipment.id}>
                  {' '}
                  <img src={equip}></img>
                  <Text>{equipment.name}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.recipe__directions}>
              <Text view='p-20' weight='medium'>Directions</Text>
               {recipe?.directions?.map((step: any,  index:number) => (
                <div key={step.id} className={styles.recipe__steps}>
                  <Text view='p-16' weight='medium'>Step {index + 1}</Text>
                  <Text view='p-14'>{step.description}</Text>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
