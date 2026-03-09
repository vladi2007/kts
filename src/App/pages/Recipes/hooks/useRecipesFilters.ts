import { type Option } from 'components/MultiDropdown';
import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useRecipesFilters = (categoryOptions: Option[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get('search') || '';

  const page = Number(searchParams.get('page')) || 1;

  const selectedCategories = useMemo(() => {
    if (!categoryOptions.length) return [];

    const categoriesQuery = searchParams.get('categories');
    if (!categoriesQuery) return [];

    const selectedKeys = categoriesQuery.split(',');

    return categoryOptions.filter((c) => selectedKeys.includes(String(c.key)));
  }, [categoryOptions, searchParams]);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        Object.entries(updates).forEach(([key, value]) => {
          if (!value) {
            params.delete(key);
          } else {
            params.set(key, value);
          }
        });

        return params;
      });
    },
    [setSearchParams]
  );

  const handleSearchChange = useCallback(
    (val: string) => {
      updateParams({
        search: val || null,
        page: null,
      });
    },
    [updateParams]
  );

  const handleCategoriesChange = useCallback(
    (val: Option[]) => {
      updateParams({
        categories: val.length ? val.map((c) => c.key).join(',') : null,
        page: null,
      });
    },
    [updateParams]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      updateParams({
        page: newPage > 1 ? String(newPage) : null,
      });
    },
    [updateParams]
  );

  return {
    searchValue,
    page,
    selectedCategories,
    handleSearchChange,
    handleCategoriesChange,
    handlePageChange,
  };
};
