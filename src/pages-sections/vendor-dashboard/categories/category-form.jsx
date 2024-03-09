import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Formik } from "formik";
import * as yup from "yup"; // GLOBAL CUSTOM COMPONENTS

import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box"; // STYLED COMPONENTS
import { Addcategory } from "services/operations/productAdmin";

import { UploadImageBox, StyledClear } from "../styles"; // FORM FIELDS VALIDATION
import { Description } from "@mui/icons-material";

const INITIAL_VALUES = {
  name: "",
  description: "",
};
const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name required"),
}); // ================================================================

const handleFormSubmit = async (values) => {
  console.log(values);
  await Addcategory(values);
  values.name = "";
  values.description = "";
};
// ================================================================
const CategoryForm = () => {
  const CreateCategoryPageView = () => {};

  return (
    <Card
      sx={{
        p: 6,
      }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="description"
                  color="info"
                  size="medium"
                  placeholder="description"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Save category
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default CategoryForm;
