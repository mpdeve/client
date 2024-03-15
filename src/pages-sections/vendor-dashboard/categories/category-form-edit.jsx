import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup"; // GLOBAL CUSTOM COMPONENTS
import { BASE_URL } from "../../../services/apis";
import axios from "axios";
import { Addcategory } from "services/operations/productAdmin";
import { usePathname } from "next/navigation";
import { EditCategory } from "services/operations/productAdmin";
const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name required"),
}); // ================================================================

// ================================================================
const CategoryFormEdit = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const [currentCategoryData, setCurrentCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  async function fetchData() {
    try {
      const response = await axios.get(
        `${BASE_URL}/product/getCategoryBySlug?slug=${slug}`
      );
      
      setCurrentCategoryData(response?.data?.categoryData);
      setId(response?.data?.categoryData?._id);
    } catch (error) {
      console.error("Failed to fetch data", error);
      // Handle error if necessary
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const INITIAL_VALUES = {
    name: currentCategoryData.name || "",
    description: currentCategoryData.description || "",
  };
  const handleFormSubmit = async (values) => {
    const ProductValues = {
      ...values,
      id: id,
    };

    await EditCategory(ProductValues);
  };

  if (!currentCategoryData.name) {
    // If currentProduct is not available yet, you can show a loading state or return null
    return <p>Loading...</p>;
  }
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

export default CategoryFormEdit;
