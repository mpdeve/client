"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import VendorForm from "../vendor-form";

const CreateVendorPageView = () => {
 


  return <Box py={4}>
      <H3 mb={2}>Create Vendor</H3>
      <VendorForm  />
    </Box>;
};

export default CreateVendorPageView;