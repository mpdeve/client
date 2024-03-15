"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import CategoryFormEdit from "../category-form-edit";

const EditCategoryPageView = () => {


  return <Box py={4}>
      <H3 mb={2}>Edit Category</H3>

      <CategoryFormEdit />
    </Box>;
};

export default EditCategoryPageView;