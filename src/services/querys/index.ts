import { gql } from "@apollo/client";

export const POC_SEARCH_QUERY = gql`
  query PocSearch($pocSearchLong: String!, $pocSearchLat: String!) {
    pocSearch(long: $pocSearchLong, lat: $pocSearchLat) {
      id
      status
      name
    }
  }
`;

export const POC_PRODUCTS_QUERY = gql`
  query Poc(
    $pocId: String!
    $productsSearch: String
    $productsCategoryId: String
  ) {
    poc(id: $pocId) {
      id
      status
      name
      products(search: $productsSearch, categoryId: $productsCategoryId) {
        id
        title
        image
        price
        category {
          id
          title
        }
      }
    }
  }
`;

export const POC_CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      title
    }
  }
`;
