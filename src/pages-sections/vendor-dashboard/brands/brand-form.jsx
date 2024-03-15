import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup"; // GLOBAL CUSTOM COMPONENTS
import { AddColor } from "services/operations/productAdmin";
const VALIDATION_SCHEMA = yup.object().shape({
  hexColor: yup.string().required("Name is required!")
}); // ================================================================

// ================================================================
const BrandForm = () => {
  const INITIAL_VALUES = {
    hexColor: "",
    colorName:""
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
    await AddColor(values);
    values.hexColor = "";
    values.colorName = "";
  };

  return <Card sx={{
    p: 6
  }}>
      <Formik onSubmit={handleFormSubmit} initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA}>
        {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }) => <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="hexColor"
                  label="hexColor"
                  color="info"
                  size="medium"
                  placeholder="hexColor"
                  value={values.hexColor}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.hexColor && !!errors.hexColor}
                  helperText={touched.hexColor && errors.hexColor}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="colorName"
                  label="colorName"
                  color="info"
                  size="medium"
                  placeholder="colorName"
                  value={values.colorName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.colorName && !!errors.colorName}
                  helperText={touched.colorName && errors.colorName}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Save Color
                </Button>
              </Grid>
            </Grid>
          </form>}
      </Formik>
    </Card>;
};

export default BrandForm;