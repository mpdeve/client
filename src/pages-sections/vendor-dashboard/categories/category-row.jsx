import { useState } from "react";
import { useRouter } from "next/navigation";


import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // GLOBAL CUSTOM COMPONENT


import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; // ========================================================================

// ========================================================================
const CategoryRow = ({
  category,
  selected
}) => {
  const {
    product,
    name,
  description,
    id,
    slug
  } = category || {};
  const router = useRouter();

  const hasSelected = selected.indexOf(name) !== -1;

  const handleNavigate = () => router.push(`/admin/categories/${slug}`);

  return <StyledTableRow tabIndex={-1} role="checkbox" selected={hasSelected}>
      <StyledTableCell align="left">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{name}</CategoryWrapper>
      </StyledTableCell>
      <StyledTableCell align="left">
        <CategoryWrapper>{description}</CategoryWrapper>
      </StyledTableCell>
   

      <StyledTableCell align="left">{product}</StyledTableCell>

    

      <StyledTableCell align="center">
        <StyledIconButton onClick={handleNavigate}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton onClick={handleNavigate}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};

export default CategoryRow;