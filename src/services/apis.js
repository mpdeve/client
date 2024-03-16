export const BASE_URL = "http://localhost:4000/api/v1";

export const productEndpoints = {
  ADDPRODUCT_API: BASE_URL + "/product/addProduct",
  GETALLRODUCT_API: BASE_URL + "/product/getAllProducts",
  EDITACTIVEPRODUCT_API: BASE_URL + "/product/editActiveproduct",
  GETALLRODUCTSEARCH_API: BASE_URL + "/product/getAllProductsSearch",
  GETRODUCTBYSLUG_API: BASE_URL + "/product/getProductsBySlug",
  EDITPRODUCT_API: BASE_URL + "/product/editproduct",
  
};
export const categoryEndpoints = {
  ADDCATEGORY_API: BASE_URL + "/product/createCategory",
  GETALLCATEGORY_API: BASE_URL + "/product/showAllCategories",
  GETCATEGORYBYSLUG_API: BASE_URL + "/product/getCategoryBySlug",
  EDITCATEGORY_API: BASE_URL + "/product/editcategory",
  GETALLCATEGORYPAGINATION_API: BASE_URL + "/product/getAllCategoriesPagination",
  DELETECATEGORY_API: BASE_URL + "/product/deletecategory",
  
};

export const colorEndpoints = {
  ADDCOLOR_API: BASE_URL + "/product/createColor",
  GETALLCOLOR_API: BASE_URL + "/product/showAllColors",
  GETCOLORBYSLUG_API: BASE_URL + "/product/getColorBySlug",
  EDITCOLOR_API: BASE_URL + "/product/editColor",
  
}