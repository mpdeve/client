import { apiConnector } from "../apiConnector";
import { productEndpoints, categoryEndpoints,colorEndpoints } from "../apis";

import { toast } from "react-hot-toast";

const { ADDPRODUCT_API, EDITACTIVEPRODUCT_API,EDITPRODUCT_API } = productEndpoints;
const { ADDCATEGORY_API,GETALLCATEGORY_API,EDITCATEGORY_API,DELETECATEGORY_API } = categoryEndpoints;
const {ADDCOLOR_API} = colorEndpoints;

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

export const EditProduct = async (data) => {
  const toastId = toast.loading("Editing Product...");
  try {
    const response = await apiConnector("PUT", EDITPRODUCT_API, data);
    toast.success("Product Edited successfully");
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

//categories API

export const Addcategory = async (data) => {
  const toastId = toast.loading("Adding Product...");
  try {
    const response = await apiConnector("POST", ADDCATEGORY_API, data);
    toast.success("category added successfully");
  } catch (error) {
    console.log("category Add Error...........", error);
  }
  toast.dismiss(toastId);
};

export const EditCategory = async (data) => {
  const toastId = toast.loading("Editing Category...");
  try {
    const response = await apiConnector("PUT", EDITCATEGORY_API, data);
    toast.success("Category Edited successfully");
  } catch (error) {
    console.log("Category Edit Error...........", error);
  }
  toast.dismiss(toastId);
};

export const DeleteCategory = async (data) => {
  const toastId = toast.loading("Deleting Category...");
  console.log(data)
  try {
    const response = await apiConnector("DELETE", DELETECATEGORY_API, data);
    toast.success("Category Deleted successfully");
  } catch (error) {
    console.log("Category Deleted Error...........", error);
  }
  toast.dismiss(toastId);
};


//Color apis


export const AddColor = async (data) => {
  const toastId = toast.loading("Adding Color...");
  try {
    const response = await apiConnector("POST", ADDCOLOR_API, data);
    toast.success("Color added successfully");
  } catch (error) {
    console.log("Color Add Error...........", error);
  }
  toast.dismiss(toastId);
};