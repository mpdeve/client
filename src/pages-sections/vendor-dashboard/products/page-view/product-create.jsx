"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import ProductForm from "../product-form";

const ProductCreatePageView = () => {
 
  return <Box py={4}>
      <H3 mb={2}>Add New Product</H3>

      <ProductForm />
    </Box>;
};

export default ProductCreatePageView;