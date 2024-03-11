export const BASE_URL = "http://localhost:4000/api/v1";

export const productEndpoints = {
  ADDPRODUCT_API: BASE_URL + "/product/addProduct",
  GETALLRODUCT_API: BASE_URL + "/product/getAllProducts",
  EDITACTIVEPRODUCT_API: BASE_URL + "/product/editActiveproduct",
  GETALLRODUCTSEARCH_API: BASE_URL + "/product/getAllProductsSearch",
};
export const categoryEndpoints = {
  ADDCATEGORY_API: BASE_URL + "/product/createCategory",
  GETALLCATEGORY_API: BASE_URL + "/product/showAllCategories",
};
