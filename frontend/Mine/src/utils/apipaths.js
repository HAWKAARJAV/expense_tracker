export const BASE_URL = ""; // Empty string for relative URLs
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER: "/api/v1/auth/getUser",
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`, // ✅ FIX
    DOWNLOAD_INCOME_EXCEL: "/api/v1/income/downloadexcel",
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`, // ✅ FIX
    DOWNLOAD_EXPENSE_EXCEL: "/api/v1/expense/downloadexcel",
  },
};