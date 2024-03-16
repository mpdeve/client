import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; // MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // GLOBAL CUSTOM COMPONENT

import BazaarSwitch from "components/BazaarSwitch"; // STYLED COMPONENTS

import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles"; // ========================================================================

// ========================================================================
const BrandRow = ({
  color,
  selected
}) => {
  const {
    colorName,
    hexColor,
    id,
    slug
  } = color || {};
  const router = useRouter();
  const hasSelected = selected.indexOf(colorName) !== -1;

  const handleNavigate = () => router.push(`/admin/colors/${slug}`);

  return <StyledTableRow tabIndex={-1} role="checkbox" selected={hasSelected}>
      <StyledTableCell align="center">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="center">{hexColor}</StyledTableCell>

      <StyledTableCell align="center">{colorName}</StyledTableCell>
      <StyledTableCell align="center">
        <StyledIconButton onClick={handleNavigate}>
        <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};

export default BrandRow;