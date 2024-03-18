import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Formik } from "formik";
import * as yup from "yup"; // GLOBAL CUSTOM COMPONENTS
import { AddVendor } from "services/operations/vendor";
const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email:"",
  password:"",
  active:true,
  phone:""
};


// ================================================================
const VendorForm = () => {
  const handleFormSubmit = async (values, { setValues }) => {
     let userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${values.firstName} ${values.lastName}`
     const ProductValues = {
      ...values,
      image: userImage
    };
     AddVendor(ProductValues);
     setValues(INITIAL_VALUES);
     userImage= ""
     
  };

  return (
    <Card
      sx={{
        p: 6,
      }}
    >
      <Formik
        onSubmit={(values, { setValues }) =>
          handleFormSubmit(values, { setValues })
        }
        init
        initialValues={INITIAL_VALUES}
    
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
                  name="firstName"
                  label="firstName"
                  color="info"
                  size="medium"
                  placeholder="firstName"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="lastName"
                  color="info"
                  size="medium"
                  placeholder="lastName"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="email"
                  color="info"
                  size="medium"
                  placeholder="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="password"
                  color="info"
                  size="medium"
                  placeholder="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="phone"
                  color="info"
                  size="medium"
                  placeholder="phone"
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControlLabel
                  name="active"
                  id="active"
                  control={
                    <Switch
                      color="primary"
                      checked={values.active}
                      onChange={handleChange}
                    />
                  }
                  label="Active Vendor"
                  labelPlacement="start"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Create Vendor
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default VendorForm;
