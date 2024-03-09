"use client";

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
import { useEffect, useState } from "react";
import CategoryRow from "../category-row";
import SearchArea from "../../search-box"; // CUSTOM DATA MODEL
import { apiConnector } from "services/apiConnector";
import { categoryEndpoints } from "services/apis";
// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading"; // =============================================================================
import { GetCategories } from "services/operations/productAdmin";
const { GETALLCATEGORY_API } = categoryEndpoints;
// =============================================================================
const CategoriesPageView = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    try {
      const response = await apiConnector("GET", GETALLCATEGORY_API);

      setCategories(response?.data?.data);
    } catch (error) {
      console.log("category Add Error...........", error);
    }
  };

  
  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredCategories = categories.map(item => ({
    id: item._id,
    name: item.name,
    slug: item.slug,
    description: item.description,
    product: item.Products.length,
    
  }));
  console.log(filteredCategories);
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: filteredCategories
  });
    return <Box py={4}>
        <H3 mb={2}>Product Categories</H3>

        <SearchArea handleSearch={() => {}} buttonText="Add Category" url="/admin/categories/create" searchPlaceholder="Search Category..." />

        <Card>
          <Scrollbar>
            <TableContainer sx={{
            minWidth: 900
          }}>
              <Table>
                <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={categories.length} numSelected={selected.length} onRequestSort={handleRequestSort} />
 
                <TableBody>
                  {filteredList.map(category => <CategoryRow key={category.id} category={category} selected={selected} />)}
                </TableBody> 
              </Table>
            </TableContainer>
          </Scrollbar>

          <Stack alignItems="center" my={4}>
            <TablePagination onChange={handleChangePage} count={Math.ceil(categories.length / rowsPerPage)} />
          </Stack>
        </Card>
      </Box>;
};

export default CategoriesPageView;
