import { Open_Sans } from "next/font/google";
export const openSans = Open_Sans({
  subsets: ["latin"]
}); // THEME PROVIDER

import ThemeProvider from "theme/theme-provider"; // PRODUCT CART PROVIDER

import CartProvider from "contexts/CartContext"; // SITE SETTINGS PROVIDER
import ReduxProvider from "reducer/ReduxProvider";
import SettingsProvider from "contexts/SettingContext"; // GLOBAL CUSTOM COMPONENTS

import RTL from "components/rtl";
import ProgressBar from "components/progress"; // IMPORT i18n SUPPORT FILE

import ShopLayout1 from "components/layouts/shop-layout-1";

import "i18n";
export default function RootLayout({
  children
}) {
  return <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <npm >
        <CartProvider>
        <ReduxProvider>
          <SettingsProvider>
            <ThemeProvider>
              <ProgressBar />
              <ShopLayout1>
              <RTL>{children}</RTL>
              </ShopLayout1>
            </ThemeProvider>
          </SettingsProvider>
          </ReduxProvider>
          </CartProvider>
        </npm>
      </body>
    </html>;
}