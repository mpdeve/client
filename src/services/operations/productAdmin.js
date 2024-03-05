import { apiConnector } from "../apiConnector";
import { productEndpoints } from "../apis";

const { ADDPRODUCT_API } = productEndpoints;

export const AddProduct = async (data) => {
  try {
    const response = await apiConnector("POST", ADDPRODUCT_API, data);
    console.log(response);
  } catch (error) {
    console.log("Product Add Error...........", error);
  }
};
