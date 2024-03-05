"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup"; // GLOBAL CUSTOM COMPONENTS
import Switch from "@mui/material/Switch";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box"; // STYLED COMPONENTS
import FormControlLabel from "@mui/material/FormControlLabel";
import { UploadImageBox, StyledClear } from "../styles"; // FORM FIELDS VALIDATION SCHEMA
import { BASE_URL } from "../../../services/apis";
import axios from "axios";
import { AddProduct } from "services/operations/productAdmin";
const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  category: yup.array().min(1).required("Category is required!"),
  description: yup.string().required("Description is required!"),
  price: yup.number().required("Price is required!"),
  vendor_price: yup.number().optional(),
  isColorVariant: yup.boolean(),
}); // ================================================================

const ProductForm = () => {
  const INITIAL_VALUES = {
    name: "",
    categories: [],
    description: "",
    price: "",
    vendor_price: "",
    isColorVariant: false,
    color: [],
    isVariant: false,
  };

  const handleFormSubmit = (values) => {
    const ProductValues = {
      ...values,
      variants: variants,
      image: fileLink
    };
console.log(ProductValues)    
    // console.log(values);
    // console.log(variants);
    // console.log(fileLink)
    AddProduct(ProductValues)
  };
  const [files, setFiles] = useState([]); // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const [fileLink, setFileLink] = useState(""); // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [variants, setVariants] = useState([
    { mode: "", description: "", price: "" },
  ]);
  
  useEffect(() => {
    getAllCategoriesDetails();
    getAllColorDetails();
  }, []);
  async function getAllCategoriesDetails() {
    try {
      const response = await axios.get(`${BASE_URL}/product/showAllCategories`);
      const data = response.data;
      setCategories(data?.data);
    } catch (error) {
      console.error("Failed to Fetch Categories", error);
    }
  }

  async function getAllColorDetails() {
    try {
      const response = await axios.get(`${BASE_URL}/product/showAllColors`);
      const data = response.data;
      setColors(data?.data);
    } catch (error) {
      console.error("Failed to Fetch Colors", error);
    }
  }
  async function postImg(key, type) {
    try {
      const response = await axios.post(`${BASE_URL}/product/uploadImg`, {
        key: key,
        content_type: type,
      });

      const data = response.data;

      setFileLink(data?.data?.fileLink);
      const newResponse = await axios.put(data?.data?.signedUrl, files[0], {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  }

  const handleVariantChange = (index, key, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][key] = value;
    setVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { mode: "", description: "", price: "" }]);
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };
  const handleChangeDropZone = (files) => {
    files.forEach((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(files);
    postImg(files[0].name, files[0].type);
  }; // HANDLE DELETE UPLOAD IMAGE

  const handleFileDelete = (file) => () => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
  };

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
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="categories"
                  onBlur={handleBlur}
                  placeholder="Category"
                  onChange={handleChange}
                  value={values.categories}
                  label="Select Category"
                  SelectProps={{
                    multiple: true,
                  }}
                  error={!!touched.categories && !!errors.categories}
                  helperText={touched.categories && errors.categories}
                >
                  {categories.map((category) => (
                    <MenuItem key={category?._id} value={category?._id}>
                      {category?.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  rows={6}
                  multiline
                  fullWidth
                  color="info"
                  size="medium"
                  name="description"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Description"
                  value={values.description}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
              </Grid>

              <Grid item xs={12}>
                <DropZone onChange={(files) => handleChangeDropZone(files)} />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                    return (
                      <UploadImageBox key={index}>
                        <Box component="img" src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="price"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.price}
                  label="Price"
                  onChange={handleChange}
                  placeholder="Price"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  name="vendor_price"
                  label="Vendor Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Vendor Price"
                  value={values.vendor_price}
                  error={!!touched.vendor_price && !!errors.vendor_price}
                  helperText={touched.vendor_price && errors.vendor_price}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControlLabel
                  name="isColorVariant"
                  id="isColorVariant"
                  control={
                    <Switch
                      color="primary"
                      checked={values.isColorVariant}
                      onChange={handleChange}
                    />
                  }
                  label="Color Variant"
                  labelPlacement="start"
                />

                {values.isColorVariant && (
                  <TextField
                    select
                    fullWidth
                    color="info"
                    size="medium"
                    name="color"
                    onBlur={handleBlur}
                    placeholder="Color"
                    onChange={handleChange}
                    value={Array.isArray(values.color) ? values.color : []} // Ensure values.color is an array
                    label="Select Color"
                    SelectProps={{
                      multiple: true,
                    }}
                    error={!!touched.color && !!errors.color}
                    helperText={touched.color && errors.color}
                  >
                    {colors.map((color) => (
                      <MenuItem key={color._id} value={color._id}>
                        {color.colorName}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControlLabel
                  name="isVariant"
                  id="isVariant"
                  control={
                    <Switch
                      color="primary"
                      checked={values.isVariant}
                      onChange={handleChange}
                    />
                  }
                  label="Multiple Varient"
                  labelPlacement="start"
                />
                {values.isVariant &&
                  variants.map((variant, index) => (
                    <Grid item sm={6} xs={12} key={index}>
                      <TextField
                        fullWidth
                        name={`mode-${index}`}
                        label="Mode"
                        value={variant.mode}
                        onChange={(e) =>
                          handleVariantChange(index, "mode", e.target.value)
                        }
                      />
                      <TextField
                        fullWidth
                        name={`description-${index}`}
                        label="Description"
                        value={variant.description}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        style={{ marginTop: "10px" }}
                      />
                      <TextField
                        fullWidth
                        name={`price-${index}`}
                        label="Price"
                        type="number"
                        value={variant.price}
                        onChange={(e) =>
                          handleVariantChange(index, "price", e.target.value)
                        }
                        style={{ marginTop: "10px" }}
                      />
                      {variants.length > 1 && (
                        <Button onClick={() => handleRemoveVariant(index)}>
                          Remove Variant
                        </Button>
                      )}
                    </Grid>
                  ))}

                {values.isVariant && (
                  <Button onClick={handleAddVariant}>Add Variant</Button>
                )}
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Save product
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default ProductForm;
