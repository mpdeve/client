"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; // GLOBAL CUSTOM COMPONENTS

import { H3 } from "components/Typography";
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table"; // GLOBAL CUSTOM HOOK

import useMuiTable from "hooks/useMuiTable"; // Local CUSTOM COMPONENT

import ProductRow from "../product-row";
import SearchArea from "../../search-box"; // CUSTOM DATA MODEL

const tableHeading = [
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "category",
    label: "Category",
    align: "left",
  },
  {
    id: "isVariant",
    label: "isVariant",
    align: "left",
  },
  {
    id: "price",
    label: "Price",
    align: "left",
  },
  {
    id: "published",
    label: "Published",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
]; // =============================================================================

// =============================================================================
const ProductsPageView = ({ products }) => {
 
  const [productList, setProductList] = useState([...products]);

  const filteredProducts = productList.map((item) => ({
    id: item._id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
    isVariant: item.isVariant,
    category: item.category.map((cate) => cate.name).join(", "),
    color:item.color.map((col) => col.colorName).join(", "),
    productIsActive:item.productIsActive,
    isSale:item.isSale,
    salePrice:item.salePrice,
    salePercentage:item.salePercentage,
    isGst:item.isGst,
    gst:item.gst,
    slug:item.slug
  }));
console.log(filteredProducts)
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredProducts,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Product List</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Product"
        url="/admin/products/create"
        searchPlaceholder="Search Product..."
      />

      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer
            sx={{
              minWidth: 900,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={5}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((product, index) => (
                  <ProductRow key={index} product={product} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(products.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default ProductsPageView;
