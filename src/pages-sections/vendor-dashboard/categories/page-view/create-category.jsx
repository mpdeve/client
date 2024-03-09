"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import CategoryForm from "../category-form";

const CreateCategoryPageView = () => {
  const INITIAL_VALUES = {
    name: "",
    parent: [],
    featured: false
  };


  return <Box py={4}>
      <H3 mb={2}>Create Category</H3>
      <CategoryForm  />
    </Box>;
};

export default CreateCategoryPageView;