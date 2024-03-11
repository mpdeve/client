"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { H3 } from "components/Typography";
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
import { apiConnector } from "services/apiConnector";
import { productEndpoints } from "services/apis";
import useMuiTable from "hooks/useMuiTable";
import Link from "next/link";
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FlexBox } from "components/flex-box";
import SearchInput from "components/SearchInput";
const { GETALLRODUCT_API, GETALLRODUCTSEARCH_API } = productEndpoints;
import ProductRow from "../product-row";

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
];

const ProductsPageView = () => {
  const [productList, setProductList] = useState([]);
  const [allProductList, setAllProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [limit, setLimit] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  useEffect(() => {
    const fetchPaginationProducts = async () => {
      const currentPage = page || 1;
      const response = await apiConnector(
        "GET",
        `${GETALLRODUCT_API}?page=${currentPage}`
      );
      setProductList(response?.data?.data);
      setCurrentPage(response?.data?.page);
      setTotalPages(response?.data?.totalPages);
      setLimit(response?.data?.limit);
    };
    fetchPaginationProducts();
  }, [page]);

  useEffect(() => {
    const fetchallProducts = async () => {
      const response = await apiConnector("GET", GETALLRODUCTSEARCH_API);
      setAllProductList(response?.data?.data);
    };
    fetchallProducts();
  }, []);

  const filteredProducts = productList.map((item) => ({
    id: item._id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
    isVariant: item.isVariant,
    category: item.category.map((cate) => cate.name).join(", "),
    color: item.color.map((col) => col.colorName).join(", "),
    productIsActive: item.productIsActive,
    isSale: item.isSale,
    salePrice: item.salePrice,
    salePercentage: item.salePercentage,
    isGst: item.isGst,
    gst: item.gst,
    slug: item.slug,
  }));

  const handleChangePage = (event, newPage) => {
    const parsedPage = parseInt(newPage, 10);

    if (!isNaN(parsedPage) && parsedPage > 0) {
      router.push(`?page=${parsedPage}`);
    } else {
      console.error("Invalid page value:", newPage);
      router.push(`?page=1`);
    }
  };

  const handleSearch = () => {
    const filteredProducts = allProductList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProductList(filteredProducts);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setProductList(allProductList);
    } else {
      handleSearch();
    }
  }, [searchQuery, allProductList]);

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredProducts,
  });

  const downSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box py={4}>
      <H3 mb={2}>Product List</H3>

      <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
        <SearchInput
          placeholder="Search Product..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button
          href="/admin/products/create"
          color="info"
          fullWidth={downSM}
          variant="contained"
          startIcon={<Add />}
          LinkComponent={Link}
          sx={{
            minHeight: 44,
          }}
        >
          Add Product
        </Button>
      </FlexBox>

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
            count={totalPages}
            page={currentPage - 0}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default ProductsPageView;
