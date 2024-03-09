// import IndexPageView from "pages-sections/landing/page-view";
import FashionTwoPageView from "pages-sections/fashion-2/page-view";
import ShopLayout1 from "components/layouts/shop-layout-1";

export const metadata = {
  title: "Bazaar - Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [
    {
      name: "UI-LIB",
      url: "https://ui-lib.com",
    },
  ],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};
export default function IndexPage() {
  return (
    <ShopLayout1>
      <FashionTwoPageView />
    </ShopLayout1>
  );
}
