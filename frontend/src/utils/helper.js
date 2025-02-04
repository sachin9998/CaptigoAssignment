import toast from "react-hot-toast";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};

export const BASE_URL = "https://captigoassignment.onrender.com";

export const handleSuccess = (msg) => {
  toast.success(msg);
};

export const handleError = (msg) => {
  toast.error(msg);
};
