"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import BrandFormEdit from "../brand-form-edit";

const EditBrandPageView = () => {

  return <Box py={4}>
      <H3 mb={2}>Edit Brand</H3>

      <BrandFormEdit/>
    </Box>;
};

export default EditBrandPageView;