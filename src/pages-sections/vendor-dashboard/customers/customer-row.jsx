import Avatar from "@mui/material/Avatar"; // MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete"; // GLOBAL CUSTOM COMPONENTS
import { useRouter } from "next/navigation";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // STYLED COMPONENTS

import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles"; // ========================================================================

// ========================================================================
const CustomerRow = ({
  customer
}) => {
  const {
    id,
    name,
    email,
    active,
    image,
    phone
  } = customer || {};

  const STYLE = {
    fontWeight: 400
  };
  const router = useRouter();
  const handleNavigate = () => router.push(`/admin/vendors/${id}`);
  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar alt={name} src={image} />
          <Paragraph fontWeight={600}>{name}</Paragraph>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {phone}
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {email}
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
      {active ? ("Active") : ("Inactive")}
      </StyledTableCell>

  
      <StyledTableCell align="center">
        <StyledIconButton onClick={handleNavigate}>
          <Edit />
        </StyledIconButton>

       
      </StyledTableCell>
    </StyledTableRow>;
};

export default CustomerRow;