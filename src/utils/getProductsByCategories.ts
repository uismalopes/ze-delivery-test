import { ICategorie } from "src/types/ICategoriesResponse";
import { ICategoryWithProducts } from "src/types/ICategoryWithProducts";
import { IProductsResponse } from "src/types/IPocProducts";

interface IProps {
  selectedPoint: IProductsResponse;
  categories: ICategorie[];
}

function getProductsByCategories(props: IProps) {
  const { categories, selectedPoint } = props;
  if (
    !categories ||
    !Array.isArray(categories) ||
    !selectedPoint ||
    typeof selectedPoint !== "object" ||
    !Array.isArray(selectedPoint?.products)
  )
    return {};

  const { products } = selectedPoint;
  const newProducts: ICategoryWithProducts = {};
  products.forEach((product) => {
    const currentCategory = categories.find(
      (category) => category.id === product.category.id
    );
    if (currentCategory) {
      if (!newProducts[currentCategory.id]) {
        newProducts[currentCategory.id] = {
          title: currentCategory.title,
          data: [],
        };
      }
      newProducts[currentCategory.id].data.push(product);
    }
  });

  return newProducts;
}

export default getProductsByCategories;
