import { useQuery } from "@apollo/client";
import ListCategories from "@components/ListCategories";
import ListProducts from "@components/ListProducts";
import { useTypedSelector } from "@hooks/useTypeSelector";
import { ActionType } from "@redux/types/actionTypes";
import { POC_CATEGORIES_QUERY } from "@services/querys";
import getProductsByCategories from "@utils/getProductsByCategories";
import { isEmptyObject } from "@utils/isEmptyObject";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaRegSadTear } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { ICategorie, ICategoriesResponse } from "../types/ICategoriesResponse";
import { ICategoryWithProducts } from "../types/ICategoryWithProducts";

function Products() {
  const { selectedPoint } = useTypedSelector((states) => states.zeStates);
  const dispatch = useDispatch();
  const { data, loading } = useQuery<ICategoriesResponse>(POC_CATEGORIES_QUERY);
  const allProducts = useMemo(() => {
    if (loading) return {};
    return getProductsByCategories({
      categories: data?.categories || [],
      selectedPoint,
    });
  }, [data, selectedPoint, loading]);

  const [filterByCategory, setFilterByCategory] =
    useState<ICategoryWithProducts | null>({});

  useEffect(() => {
    dispatch({ type: ActionType.SET_IS_PAGE_PRODUCT, payload: true });
  }, []);

  useEffect(() => {
    dispatch({ type: ActionType.SET_LOADING, payload: loading });
  }, [loading]);

  const onSelectCategory = useCallback(
    (category: ICategorie | null, isActive) => {
      if (category && isActive) {
        if (allProducts?.[category.id]) {
          setFilterByCategory({
            [category.id]: allProducts?.[category.id],
          });
        } else {
          setFilterByCategory(null);
        }
      } else {
        setFilterByCategory({});
      }
    },
    [allProducts]
  );

  const getListProducts = useMemo(() => {
    if (filterByCategory && !isEmptyObject(filterByCategory)) {
      return filterByCategory;
    }
    return allProducts;
  }, [filterByCategory, allProducts]);

  return (
    <div className="page-products">
      <div className="container">
        {data?.categories.length && (
          <ListCategories
            categories={data.categories}
            onSelectCategory={onSelectCategory}
          />
        )}
        {!filterByCategory ? (
          <div className="not-found-filter text-center my-5">
            <h6 className="mb-2 text-light-secondary">Não encontrado</h6>
            <FaRegSadTear size={50} color="#ffcc00" />
          </div>
        ) : (
          Object.keys(getListProducts).map((productKey) => (
            <ListProducts key={productKey} {...allProducts[productKey]} />
          ))
        )}
      </div>
    </div>
  );
}
export default Products;
