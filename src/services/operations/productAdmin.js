import { apiConnector } from "../apiConnector";
import { productEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const { ADDPRODUCT_API ,EDITACTIVEPRODUCT_API} = productEndpoints;

export const AddProduct = async (data) => {
  const toastId = toast.loading("Adding Product...");
  try {
    const response = await apiConnector("POST", ADDPRODUCT_API, data);
    toast.success("Product added successfully");
  } catch (error) {
    console.log("Product Add Error...........", error);
  }
  toast.dismiss(toastId);
};

export const EditProductStatus = async (data) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", EDITACTIVEPRODUCT_API, data);
    toast.success("Product Saved successfully");
  } catch (error) {
    console.log("Product Add Error...........", error);
  }
  toast.dismiss(toastId);
};

