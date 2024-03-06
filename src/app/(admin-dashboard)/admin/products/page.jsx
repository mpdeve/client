import { ProductsPageView } from "pages-sections/vendor-dashboard/products/page-view"; // API FUNCTIONS
import { productEndpoints } from "services/apis";
const { GETALLRODUCT_API} = productEndpoints;
import api from "utils/__api__/dashboard";
export const metadata = {
  title: "Products - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function Products() {
  const Data =  await fetch(GETALLRODUCT_API, { cache: 'no-cache' })
  const response = await Data.json()
  const ProductList = response?.data;
  console.log(ProductList)
  
  return <ProductsPageView products={ProductList}  />;
}