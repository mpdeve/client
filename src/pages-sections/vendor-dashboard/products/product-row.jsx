import { useState } from "react";
import { useRouter } from "next/navigation";

import Avatar from "@mui/material/Avatar"; // MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // GLOBAL CUSTOM COMPONENTS
import Box from '@mui/material/Box';
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION
import { EditProductStatus } from "services/operations/productAdmin";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; // ========================================================================

// ========================================================================
const ProductRow = ({
  product
}) => {
  const {
    category,
    name,
    price,
    image,
    iscake,
    id,
    color,
    productIsActive,
    slug,
    isSale,
    salePrice,
    salePercentage,
    cakevariants,
    isGst,
    gst
  } = product || {};

  const DeleteProductData = {
    productId:id
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '57%',
    transform: 'translate(-50%, -50%)',
    width: 1500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  console.log(cakevariants)
const varient = iscake == true ? ("True"):("False");
const updatedPrice = iscake == true ? ("-"):(price);
  const router = useRouter();
  const [productPublish, setProductPublish] = useState(productIsActive);
  const handleChange = async () => {
    // Toggle the productPublish state immediately
    setProductPublish((prevPublish) => !prevPublish);

  
    // Prepare data for updating the status
    const data = {
      productId: id,
      productIsActive: !productPublish, // Toggle the status here
    };
  
    // Call the changeStatus function with the updated status
    await changeStatus(data);
   
    window.location.reload();
  };
  
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };



  const changeStatus = async (data) => {
    try {
      console.log(data);
      // Call the API to update the product status
      await EditProductStatus(data);
      
    } catch (error) {
      console.error("Failed to change product status", error);
      // Handle error if necessary
    }
  };
  



  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
        <Avatar
  alt={name}
  src={Array.isArray(image) ? image[0] : image}
  sx={{
    borderRadius: 2
  }}
/>

          <div>
            <Paragraph fontWeight={600}>{name}</Paragraph>
            <Small color="grey.600">#{id.split("-")[0]}</Small>
          </div>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{category}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
      {varient}
      </StyledTableCell>

      <StyledTableCell align="left">{iscake == true ? ("-"):(`₹ ${price}`)}</StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={productIsActive} onChange={handleChange} />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/products/${slug}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton onClick={handleOpen}>
          <RemoveRedEye />
          <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
    <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      {/* Header row */}
      <TableRow>
        <TableCell>Product Name:</TableCell>
        <TableCell>Categories:</TableCell>
        <TableCell>Colors:</TableCell>
        <TableCell>Price:</TableCell>
        <TableCell>Sale Price:</TableCell>
        <TableCell>GST:</TableCell>
        <TableCell>Slug</TableCell>
        <TableCell>variant</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    
        <TableRow >
          <TableCell>{name}</TableCell>
          <TableCell>{category}</TableCell>
          <TableCell>{color}</TableCell>
          <TableCell>{iscake == true ? ("-"):(`₹ ${price}`)}</TableCell>
          <TableCell>{isSale == true && iscake == false  ? (`₹ ${salePrice}`) : ("-")}</TableCell>
          <TableCell>{isGst == true ? (gst):("-")}</TableCell>
          <TableCell>{slug}</TableCell>
          {cakevariants.map((variant) => (
                      <TableRow key={variant._id}>
                        <TableCell>{variant.mode == 500 ? (`${variant.mode} grams`):(`${variant.mode} Kg`)}</TableCell>
                        <TableCell>{`₹ ${variant.price}`}</TableCell>
                      </TableRow>
                    ))}
        </TableRow>
     
    </TableBody>
  </Table>
</TableContainer>

        </Box>
      </Modal>
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};

export default ProductRow;