"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Add from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { H3 } from "components/Typography";
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
import { FlexBox } from "components/flex-box";
import SearchInput from "components/SearchInput";
import { apiConnector } from "services/apiConnector";
import { categoryEndpoints } from "services/apis";
import CategoryRow from "../category-row";
import useMuiTable from "hooks/useMuiTable"; // Correct import
const { GETALLCATEGORYPAGINATION_API,GETALLCATEGORY_API } = categoryEndpoints;

const tableHeading = [
  { id: "id", label: "Category ID" },
  { id: "name", label: "Category Name" },
  { id: "description", label: "Description" },

  { id: "Product", label: "Product" },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

const CategoriesPageView = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allcategories, setAllcategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [limit, setLimit] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  console.log(categories)
  console.log(allcategories)
  useEffect(() => {
   
    fetchPaginationProducts();
  }, [page]);
  const fetchPaginationProducts = async () => {
    const currentPage = page || 1;
    const response = await apiConnector(
      "GET",
      `${GETALLCATEGORYPAGINATION_API}?page=${currentPage}`
    );
    setCategories(response?.data?.data);
    setCurrentPage(response?.data?.page);
    setTotalPages(response?.data?.totalPages);
    setLimit(response?.data?.limit);
  };
  const downSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await apiConnector("GET", GETALLCATEGORY_API);
      setAllcategories(response?.data?.data);
    } catch (error) {
      console.log("Category Add Error:", error);
    }
  };

  const filteredCategories = categories.map((item) => ({
    id: item._id,
    name: item.name,
    slug: item.slug,
    description: item.description,
    product: item.Products.length,
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
  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchPaginationProducts()
      
    } else {
      handleSearch();
    }
  }, [searchQuery]); 
  

  const handleSearch = () => {
    const filteredCategories = allcategories.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCategories(filteredCategories);
  };
  

  // Ensure proper usage of useMuiTable hook
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredCategories,
  });

  return (
    <Box py={4}>
      <H3 mb={2}>Product Categories</H3>
      <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
        <SearchInput
          placeholder="Search Category..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          href="/admin/categories/create"
          color="info"
          fullWidth={downSM}
          variant="contained"
          startIcon={<Add />}
          LinkComponent={Link}
          sx={{
            minHeight: 44,
          }}
        >
          Add Category
        </Button>
      </FlexBox>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={categories.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredList.map((category) => (
                  <CategoryRow
                    key={category._id}
                    category={category}
                    selected={selected}
                  />
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

export default CategoriesPageView;
