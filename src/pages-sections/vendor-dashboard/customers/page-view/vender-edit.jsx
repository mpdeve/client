"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import VendorFormEdit from "../vendor-form-edit";

const EditVenderPageView = () => {


  return <Box py={4}>
      <H3 mb={2}>Edit Vender</H3>

      <VendorFormEdit />
    </Box>;
};

export default EditVenderPageView;