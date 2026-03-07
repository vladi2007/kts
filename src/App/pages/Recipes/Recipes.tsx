import { useDebounce } from '@uidotdev/usehooks';
import Card from 'components/Card';
import Input from 'components/Input';
import Loader from 'components/Loader';
import MultiDropdown, { type Option } from 'components/MultiDropdown';
import Text from 'components/Text';
import useWindowWidth from 'hooks/UseWindowWidth';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { type RecipeData, type Ingredient } from 'types/Recipes';

import { pageSize } from './Recipes.config';
import styles from './Recipes.module.scss';
import Pagination from './components/Pagination';
import { useRecipesFilters } from './hooks/useRecipesFilters';
import { useCategoriesQuery, useRecipesQuery } from './hooks/useRecipesQuery';
import recipesImage from './icons/recipes_image.svg';
const Recipes = () => {
  const navigate = useNavigate();
  const width = useWindowWidth();
  const navView = width < 480 ? 'p-12' : width < 768 ? 'p-14' : 'p-20';

  const { data: categoriesData, isLoading: categoriesLoading } = useCategoriesQuery();

  const categoryOptions: Option[] = useMemo(
    () =>
      categoriesData?.map((c) => ({
        value: c.title,
        key: c.id,
      })) || [],
    [categoriesData]
  );
  const {
    searchValue,
    page,
    selectedCategories,
    handleSearchChange,
    handleCategoriesChange,
    handlePageChange,
  } = useRecipesFilters(categoryOptions);
  const searchParams = useDebounce(searchValue, 1000);
  const selectedCategoryIds = useMemo(
    () => selectedCategories.map((c) => c.key),
    [selectedCategories]
  );
  const { data, isLoading } = useRecipesQuery({
    search: searchParams,
    page,
    categories: selectedCategoryIds,
    pageSize,
  });

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
            onChange={handleSearchChange}
            placeholder="Enter dishes"
            className={styles.recipes__finder_input}
          />
        </div>
        {!categoriesLoading ? (
          <MultiDropdown
            className={styles.recipes__categories}
            options={categoryOptions}
            value={selectedCategories}
            onChange={handleCategoriesChange}
            getTitle={(val: Option[]) =>
              val.length > 0 ? val.map((v) => v.value).join(', ') : 'Categories'
            }
          />
        ) : (
          <div className={styles.recipes__categories}>
            <Loader size="m" color="accent" />
          </div>
        )}
        {!isLoading ? (
          <>
            <div className={styles.recipes__cards}>
              {data?.recipes?.map((r: RecipeData) => {
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
                    recipe={r}
                  />
                );
              })}
            </div>

            <Pagination
              currentPage={page}
              pageCount={data?.meta.pagination.pageCount}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className={styles.recipes__cards}>
            <Loader size="l" color="accent" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
