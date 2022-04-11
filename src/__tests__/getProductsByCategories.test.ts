import getProductsByCategories from "../utils/getProductsByCategories";
import categories from "../__mocks__/categories.json";
import selectedPoint from "../__mocks__/selectedPoint.json";
import expectGetProductsByCategories from "../__mocks__/expectGetProductsByCategories.json";

describe("tests function getProductsByCategories", ()=>{
  test("Return the correct values", ()=>{
    expect(getProductsByCategories({ categories, selectedPoint})).toEqual(expectGetProductsByCategories);
  });
  
  test("Wrong tests", ()=>{
    expect(getProductsByCategories({
      // @ts-ignore
      categories: {},
      selectedPoint
    })).toEqual({});

    expect(getProductsByCategories({
      categories: [],
      selectedPoint
    })).toEqual({});

    expect(getProductsByCategories({
      categories,
      // @ts-ignore
      selectedPoint: {}
    })).toEqual({});

    expect(getProductsByCategories({
      categories,
      // @ts-ignore
      selectedPoint: []
    })).toEqual({});
  });
})