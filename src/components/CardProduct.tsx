import { useTypedSelector } from "@hooks/useTypeSelector";
import { ActionType } from "@redux/types/actionTypes";
import { convertMoney } from "@utils/convertMoney";
import { useCallback, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { IProduct } from "../types/IPocProducts";

function CardProduct(props: IProduct) {
  const { title, price, image } = props;
  const dispatch = useDispatch();
  const { totalItemInBag } = useTypedSelector((states) => states.zeStates);
  const [count, setCount] = useState(0);

  const onClick = useCallback(
    (type = "add") => {
      let payload = totalItemInBag;
      if (type === "add") {
        setCount(count + 1);
        payload += 1;
      } else {
        setCount(count - 1);
        payload -= 1;
      }
      dispatch({
        type: ActionType.SET_ITEM_IN_BAG,
        payload,
      });
    },
    [totalItemInBag]
  );

  return (
    <div className="card-product py-2">
      {count > 0 && (
        <div className="total-items">
          <span>{count}</span>
        </div>
      )}
      <div className="buttons-bag pr-1 fadeInRight">
        <button
          type="button"
          className="btn btn-add"
          onClick={() => onClick("add")}
        >
          <AiOutlinePlus />
        </button>
        <p className="text-center">{count}</p>
        <button
          type="button"
          className="btn btn-remove"
          disabled={count <= 0}
          onClick={() => onClick("remove")}
        >
          <AiOutlineMinus />
        </button>
      </div>
      <div className="card-image px-2">
        <img src={image} alt={title} className="img-fluid" />
      </div>
      <div className="product-details px-2">
        <p className="text-light-secondary title my-1">{title}</p>
        <strong className="d-block">{convertMoney(price)}</strong>
      </div>
    </div>
  );
}

export default CardProduct;
