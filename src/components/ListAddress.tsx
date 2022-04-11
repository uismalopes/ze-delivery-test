import { useLazyQuery } from "@apollo/client";
import notFound from "@assets/images/not-found.png";
import { useTypedSelector } from "@hooks/useTypeSelector";
import { ActionType } from "@redux/types/actionTypes";
import { POC_PRODUCTS_QUERY } from "@services/querys";
import { isEmptyArray } from "@utils/isEmptyArray";
import { FormikHelpers } from "formik";
import { useCallback, useMemo } from "react";
import { CircularProgress } from "react-cssfx-loading";
import { BiTargetLock } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IFormAddress } from "src/types/IFormAddress";
import { IProductsResponse } from "src/types/IPocProducts";

import { IMapBoxResponseSearch } from "../types";
import FormAddress from "./FormAddress";

interface IProps {
  data: IMapBoxResponseSearch[];
  refPosition: React.RefObject<HTMLElement>;
  onSelected: (item: IMapBoxResponseSearch) => void;
  isLoading: boolean;
  isUseBrowserLocation: boolean;
  showFormAddress: boolean;
  isNotFind: boolean;
}

function ListAddress(props: IProps) {
  const {
    data,
    refPosition,
    onSelected,
    isLoading,
    isUseBrowserLocation,
    showFormAddress,
    isNotFind = false,
  } = props;

  const navigate = useNavigate();
  const [getProducts] = useLazyQuery<{ poc: IProductsResponse }>(
    POC_PRODUCTS_QUERY
  );
  const { address } = useTypedSelector((states) => states.zeStates);
  const dispatch = useDispatch();
  const setPosition = useMemo<React.CSSProperties>(() => {
    const element = refPosition.current;
    if (element) {
      const { left, top, height, width } = element.getBoundingClientRect();
      const bodyRect = document.body.getBoundingClientRect();
      return {
        top: top - bodyRect.top + height,
        left,
        width,
      };
    }
    return {};
  }, [refPosition]);

  const onSubmitForm = useCallback(
    (values, formikHelpers: FormikHelpers<IFormAddress>) => {
      getProducts({
        variables: {
          pocId: address.pocId,
          productsSearch: null,
          productsCategoryId: null,
        },
      })
        .then(({ data }) => {
          if (data?.poc) {
            dispatch({
              type: ActionType.SET_SELECTED_POINT,
              payload: data.poc,
            });
            navigate("products");
          }
        })
        .finally(() => {
          formikHelpers.setSubmitting(false);
        });
    },
    [address]
  );

  if (showFormAddress) {
    return (
      <div className="list-address mt-1" style={setPosition}>
        <FormAddress onSubmitForm={onSubmitForm} />
      </div>
    );
  }

  return (
    <div className="list-address bg-white" style={setPosition}>
      {!isLoading && !isNotFind && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => onSelected(item)}>
                <span className="icon-list">
                  <GoLocation size={20} color="#cccccc" />
                </span>
                <p className="text-left">
                  <span>{item.text}</span>
                  <span>{item.place_name}</span>
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
      {isNotFind && (
        <div className="not-found text-center p-2">
          <div className="box-image">
            <img
              src={notFound}
              alt="Não encontramos seu endereço"
              className="img-fluid"
            />
          </div>
          <p className="mb-1">Ops! Não encontramos seu endereço...</p>
          <p className="text-light-secondary">
            Você pode conferir se digitou corretamente ou indicar seu local no
            mapa.
          </p>
          <button type="button" className="btn p-2 mt-2">
            Quero indicar no mapa
          </button>
        </div>
      )}
      {isLoading && (
        <div className="loading-icon text-center">
          <CircularProgress color="#ffcc00" />
          <p>
            <strong>Buscando...</strong>
          </p>
        </div>
      )}
      {isUseBrowserLocation && (
        <div className="browser-location p-1 d-flex align-items-center">
          <span className="text-light-secondary">
            <BiTargetLock size={24} />
          </span>
          <a href="#search" className="text-dark-primary">
            Usar minha localização
          </a>
        </div>
      )}
      {!isEmptyArray(data) && !isLoading && !isNotFind && (
        <div className="footer-list text-center">
          <span className="d-block">Meu endereço não tá na lista...</span>
          <button type="button">Quero indicar no mapa</button>
        </div>
      )}
    </div>
  );
}

export default ListAddress;
