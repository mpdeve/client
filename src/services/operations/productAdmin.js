import { apiConnector } from "../apiConnector";
import { productEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const { ADDPRODUCT_API } = productEndpoints;

export const AddProduct = async (data) => {
  const toastId = toast.loading("Adding Product...");
  try {
    const response = await apiConnector("POST", ADDPRODUCT_API, data);
    console.log(response);
    toast.success("Product added successfully");
  } catch (error) {
    console.log("Product Add Error...........", error);
  }
  toast.dismiss(toastId);
};
