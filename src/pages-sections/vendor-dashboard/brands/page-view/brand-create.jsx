"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // CUSTOM DATA MODEL

import BrandForm from "../brand-form";

const CreateBrandPageView = () => {


  const handleFormSubmit = () => {};

  return <Box py={4}>
      <H3 mb={2}>Create New Color</H3>

      <BrandForm  />
    </Box>;
};

export default CreateBrandPageView;