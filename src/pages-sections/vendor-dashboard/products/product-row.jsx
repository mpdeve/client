import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; // MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION
import { EditProductStatus } from "services/operations/productAdmin";
import { currency } from "lib"; // STYLED COMPONENTS

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
    isVariant,
    id,
    published,
    productIsActive,
    slug
  } = product || {};
const varient = isVariant == true ? ("True"):("False");
const updatedPrice = isVariant == true ? ("-"):(price);
  const router = useRouter();
  const [productPublish, setProductPublish] = useState(productIsActive);
  const handleChange = () =>{
    setProductPublish(!productPublish)
    const data = {
      productId: id,
      productIsActive: productPublish,
    };
    EditProductStatus(data)
  }
  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar alt={name} src={image} sx={{
          borderRadius: 2
        }} />

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

      <StyledTableCell align="left">{isVariant == true ? ("-"):(`₹ ${price}`)}</StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={productIsActive} onChange={handleChange} />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/products/${slug}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};

export default ProductRow;