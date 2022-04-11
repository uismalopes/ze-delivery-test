import { useLazyQuery } from "@apollo/client";
import Input from "@components/Input";
import ListAddress from "@components/ListAddress";
import { useTypedSelector } from "@hooks/useTypeSelector";
import { ActionType } from "@redux/types/actionTypes";
import mapBoxService from "@services/mapBoxService";
import { POC_SEARCH_QUERY } from "@services/querys";
import { useDebounce } from "@utils/debounce";
import { isEmptyArray } from "@utils/isEmptyArray";
import { isEmptyObject } from "@utils/isEmptyObject";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { useDispatch } from "react-redux";

import { IMapBoxResponseSearch } from "../types";
import { IPocSearchResponse } from "../types/IPocSearchResponse";

function Home() {
  const dispatch = useDispatch();
  const refInput = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [showFormAddress, setShowFormAddress] = useState(false);
  const [isNotFind, setIsNotFind] = useState(false);
  const { address } = useTypedSelector((states) => states.zeStates);
  const [listLocales, setListLocales] = useState<IMapBoxResponseSearch[]>([]);
  const [getPocSearch] = useLazyQuery<IPocSearchResponse>(POC_SEARCH_QUERY);

  useEffect(() => {
    dispatch({ type: ActionType.SET_IS_PAGE_PRODUCT, payload: false });
  }, []);

  const placeholder = useMemo(() => {
    return isFocus
      ? "Insira o endereço com número"
      : "Inserir endereço para ver preço";
  }, [isFocus]);

  const onChangeSearch = useDebounce<React.ChangeEvent<HTMLInputElement>>(
    (e) => setSearchText(e.target.value),
    250
  );

  useEffect(() => {
    if (searchText) {
      setIsLoading(true);
      mapBoxService
        .get<{ features: IMapBoxResponseSearch[] }>(`${searchText}.json`)
        .then(({ data }) => {
          setListLocales(data.features);
        })
        .finally(() => setTimeout(() => setIsLoading(false), 400));
    } else {
      setListLocales([]);
    }
  }, [searchText]);

  const onSelectedLocale = useCallback(
    (item: IMapBoxResponseSearch) => {
      setShowFormAddress(false);
      setIsLoading(true);
      const [long, lat] = item.geometry.coordinates;
      getPocSearch({
        variables: {
          pocSearchLong: String(long),
          pocSearchLat: String(lat),
        },
      })
        .then(({ data }) => {
          setShowFormAddress(!isEmptyArray(data?.pocSearch));
          setIsNotFind(isEmptyArray(data?.pocSearch));
          if (data?.pocSearch) {
            const payload = {
              pocId: data.pocSearch?.[0]?.id,
              ...item,
            };
            dispatch({
              type: ActionType.SET_ADDRESS,
              payload,
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [address]
  );

  const resetComponent = useCallback(() => {
    if (refInput.current) refInput.current.value = "";
    dispatch({ type: ActionType.SET_ADDRESS, payload: {} });
    setListLocales([]);
    setSearchText("");
    setShowFormAddress(false);
    setIsNotFind(false);
  }, []);

  useEffect(() => {
    if (!isFocus) {
      resetComponent();
    }
  }, [isFocus]);

  const onClickInput = useCallback(
    (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      const { value } = e.currentTarget;
      if (value && !isEmptyObject(address)) {
        resetComponent();
      }
    },
    [address]
  );

  return (
    <>
      {isFocus && (
        <div
          className="overlay"
          onClick={() => setIsFocus(false)}
          role="button"
          aria-hidden="true"
        />
      )}
      <section className="home-page bg-primary">
        <div className="welcome-header">
          <div className="container">
            <div className="main">
              <h1 className="text-center main-title">
                <strong>Bebidas geladas</strong> a <strong>preço</strong> de
                mercado na sua casa <strong>agora</strong>
              </h1>
              <div className="address-search-input">
                <div className="icon">
                  {!isFocus ? (
                    <GoLocation size={20} color="#666" />
                  ) : (
                    <button type="button" onClick={() => setIsFocus(false)}>
                      <FiArrowLeft size={20} color="#666" />
                    </button>
                  )}
                </div>
                <Input
                  ref={refInput}
                  type="text"
                  name="address"
                  autoComplete="off"
                  className="form-control"
                  placeholder={placeholder}
                  onFocus={() => setIsFocus(true)}
                  onChange={onChangeSearch}
                  onClick={onClickInput}
                />
              </div>
            </div>
          </div>
        </div>
        {isFocus && (
          <ListAddress
            isNotFind={isNotFind}
            onSelected={onSelectedLocale}
            data={listLocales}
            refPosition={refInput}
            isLoading={isLoading}
            isUseBrowserLocation={isFocus && !searchText}
            showFormAddress={showFormAddress}
          />
        )}
      </section>
    </>
  );
}

export default Home;
