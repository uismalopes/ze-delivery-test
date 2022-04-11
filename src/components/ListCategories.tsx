import { useCallback, useRef } from "react";

import { ICategorie } from "../types/ICategoriesResponse";

interface IProps {
  categories: ICategorie[];
  onSelectCategory: (category: ICategorie | null, isActive: boolean) => void;
}

function ListCategories(props: IProps) {
  const { categories, onSelectCategory } = props;
  const ref = useRef<HTMLDivElement>(null);

  const onClick = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      category: ICategorie
    ) => {
      const button = event.currentTarget;
      if (ref?.current) {
        const currentIndexBtn = Array.prototype.slice
          .call(button.parentElement?.children)
          .indexOf(button);
        ref.current.querySelectorAll(`button`).forEach((button, index) => {
          if (index !== currentIndexBtn) {
            button.classList.remove("active");
          }
        });
      }
      button.classList.toggle("active");
      const isActive = button.classList.contains("active");
      onSelectCategory(category, isActive);
    },
    []
  );

  return (
    <div ref={ref} className="list-categories my-5">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className="btn"
          onClick={(e) => onClick(e, category)}
        >
          <span>{category.title}</span>
        </button>
      ))}
    </div>
  );
}

export default ListCategories;
