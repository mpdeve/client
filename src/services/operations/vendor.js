import { apiConnector } from "../apiConnector";
import { vendorEndpoints } from "../apis";

import { toast } from "react-hot-toast";

const { ADDVENDOR_API,EDITVENDOR_API } = vendorEndpoints;

export const AddVendor = async (data) => {
    const toastId = toast.loading("Adding Vendor...");
    try {
      const response = await apiConnector("POST", ADDVENDOR_API, data);
      toast.success("Vendor added successfully");
    } catch (error) {
      console.log("Vendor Add Error...........", error);
    }
    toast.dismiss(toastId);
  };

  export const EditVendor = async (data) => {
    const toastId = toast.loading("Editing Vendor...");
    try {
      const response = await apiConnector("PUT", EDITVENDOR_API, data);
      toast.success("Vendor Edited successfully");
    } catch (error) {
      console.log("Vendor Editing Error...........", error);
    }
    toast.dismiss(toastId);
  };