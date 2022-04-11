import { useMemo, useState } from "react";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { IValuesCategoryWithProducts } from "src/types/ICategoryWithProducts";

import CardProduct from "./CardProduct";

const MAX_PRODUCTS_SHOW = 5;

function ListProducts(props: IValuesCategoryWithProducts) {
  const { data, title } = props;

  const [showAll, setShowAll] = useState(false);
  const listProducts = useMemo(() => {
    return data.slice(0, showAll ? data.length : MAX_PRODUCTS_SHOW);
  }, [showAll]);

  return (
    <div className="list-products mb-5">
      <p className="text-uppercase text-light-secondary mb-2">{title}</p>
      <div className="grid-products">
        {listProducts.map((product) => (
          <div className="grid-item" key={product.id}>
            <CardProduct {...product} />
          </div>
        ))}
        {data.length > MAX_PRODUCTS_SHOW && (
          <div className="content-button text-center d-flex align-items-center justify-content-center">
            <button
              type="button"
              className="btn button-show-more d-flex align-items-center justify-content-center text-primary"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <BsArrowLeftShort size={30} />
              ) : (
                <BsArrowRightShort size={30} />
              )}
            </button>
            <span className="mt-1 d-block">
              {showAll ? "Ver menos" : "Ver todos"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListProducts;
