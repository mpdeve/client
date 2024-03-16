"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; // GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import SearchInput from "components/SearchInput";
import useMediaQuery from "@mui/material/useMediaQuery";
import { H3 } from "components/Typography";
import Scrollbar from "components/scrollbar";
import Add from "@mui/icons-material/Add";
import { TableHeader, TablePagination } from "components/data-table"; // GLOBAL CUSTOM HOOK
import Button from "@mui/material/Button";
import useMuiTable from "hooks/useMuiTable"; // Local CUSTOM COMPONENT

import BrandRow from "../brand-row";
import SearchArea from "../../search-box"; // CUSTOM DATA MODEL
import { colorEndpoints } from "services/apis";
import { apiConnector } from "services/apiConnector";
// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading"; // =============================================================================
import { useEffect, useState } from "react";
const {GETALLCOLOR_API} = colorEndpoints;
// =============================================================================
const BrandsPageView = () => {

  const [colors,setColors] = useState([]);
  const [AllColors,setAllColors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(()=>{
    fetchColors()
  },[])

  const fetchColors = async () =>{
    try {
      const response = await apiConnector("GET",GETALLCOLOR_API );
      setAllColors(response?.data?.data)
     setColors(response?.data?.data)
    } catch (error) {
      console.log("Color fetch Error...........", error);
    }
  }
  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredColors = colors.map(item => ({
    id: item._id,
    slug: item.slug,
    colorName: item.colorName,
    hexColor: item.hexColor,
  
  }));

  useEffect(() => {
    if (searchQuery.trim() === "") {
     setColors(AllColors)
      
    } else {
      handleSearch();
    }
  }, [searchQuery]); 
  

  const handleSearch = () => {
    const filteredColors = colors.filter((item) =>
      item.colorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setColors(filteredColors);
  };
  const downSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: filteredColors,
    defaultSort: "name"
  });
  return <Box py={4}>
      <H3 mb={2}>Product Colors</H3>
      <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
        <SearchInput
          placeholder="Search Color..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          href="/admin/colors/create"
          color="info"
          fullWidth={downSM}
          variant="contained"
          startIcon={<Add />}
          LinkComponent={Link}
          sx={{
            minHeight: 44,
          }}
        >
          Add Color
        </Button>
      </FlexBox>

      <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 600
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} numSelected={selected.length} rowCount={filteredList.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map(color => <BrandRow key={color._id} color={color} selected={selected} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(filteredList.length / rowsPerPage)} />
        </Stack>
      </Card>
    </Box>;
};

export default BrandsPageView;