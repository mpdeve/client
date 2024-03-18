"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; // GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { H3 } from "components/Typography";
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table"; // GLOBAL CUSTOM HOOK
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchInput from "components/SearchInput";
import { apiConnector } from "services/apiConnector";
import { vendorEndpoints } from "services/apis";
import useMuiTable from "hooks/useMuiTable"; // Local CUSTOM COMPONENT
import CustomerRow from "../customer-row"; // TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading"; // =============================================================================
const { GETALLVENDOR_API, GETPAGINATIONVENDOR_API } = vendorEndpoints;
// =============================================================================
const CustomersPageView = () => {
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allVendors, setAllVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [limit, setLimit] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  useEffect(() => {
    fetchPaginationVendors();
  }, [page]);
  const fetchPaginationVendors = async () => {
    const currentPage = page || 1;
    const response = await apiConnector(
      "GET",
      `${GETPAGINATIONVENDOR_API}?page=${currentPage}`
    );
    console.log(response)
    setVendors(response?.data?.vendors);
    setCurrentPage(response?.data?.page);
    setTotalPages(response?.data?.totalPages);
    setLimit(response?.data?.limit);
  };

  const downSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    getVendors();
  }, []);

  const getVendors = async () => {
    try {
      const response = await apiConnector("GET", GETALLVENDOR_API);
      setAllVendors(response?.data?.vendors);
    } catch (error) {
      console.log("Vendor Add Error:", error);
    }
  };
  const filteredVendors = vendors.map((item) => ({
    id: item._id,
    name: item.firstName + " " + item.lastName,
    email: item.email,
    active: item.active,
    image: item.image,
    phone: item.phone,
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
      fetchPaginationVendors()
      
    } else {
      handleSearch();
    }
  }, [searchQuery]); 
  

  const handleSearch = () => {
    const filteredVendors = allVendors.filter((item) =>
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setVendors(filteredVendors);
  };
  
  const {
    order,
    orderBy,
    selected,
    filteredList,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredVendors,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Vendors</H3>

      <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
        <SearchInput
          placeholder="Search Category..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          href="/admin/vendors/create"
          color="info"
          fullWidth={downSM}
          variant="contained"
          startIcon={<Add />}
          LinkComponent={Link}
          sx={{
            minHeight: 44,
          }}
        >
          Add Vendor
        </Button>
      </FlexBox>

      <Card>
        <Scrollbar>
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
                numSelected={selected.length}
                rowCount={filteredList.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((customer) => (
                  <CustomerRow customer={customer} key={customer.id} />
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

export default CustomersPageView;
