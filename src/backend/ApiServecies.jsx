import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// ========== توابع بدون توكن ==========

// POST بدون توكن ويقبل Body
export const postNoToken = async (url, data = {}, customHeaders = {}) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...customHeaders,
      },
    });
    return response.data || response;
  } catch (error) {
    console.error("AXIOS ERROR:", error);
    throw error.response ? error.response.data : error;
  }
};

// ========== توابع بإرسال توكن من الكوكيز ==========

const getAuthHeaders = (customHeaders = {}) => {
  const token = cookies.get("token"); 
  return {
    Authorization: token ? `Bearer ${token}` : "",
    ...customHeaders,
  };
};

// GET مع توكن
export const getData = async (url, customHeaders = {}) => {
  try {
    const response = await axios.get(url, {
      headers: getAuthHeaders(customHeaders),
    });
    return response?.data || response;
  } catch (error) {
    console.error("AXIOS ERROR:", error);
    throw error.response ? error.response.data : error;
  }
};

// POST مع توكن
export const postData = async (url, data = {}, customHeaders = {}) => {
  try {
    const isFormData = data instanceof FormData;

    const response = await axios.post(url, data, {
      headers: {
        ...getAuthHeaders(customHeaders),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    });

    return response.data || response;
  } catch (error) {
    console.error("AXIOS ERROR:", error);
    throw error.response ? error.response.data : error;
  }
};

// PATCH مع توكن
export const patchData = async (url, data = {}, customHeaders = {}) => {
  try {
    const response = await axios.patch(url, data, {
      headers: getAuthHeaders(customHeaders),
    });
    return response.data || response;
  } catch (error) {
    console.error("AXIOS ERROR:", error);
    throw error.response ? error.response.data : error;
  }
};

// PUT مع توكن
export const putData = async (url, data = {}, customHeaders = {}) => {
  try {
    const response = await axios.put(url, data, {
      headers: getAuthHeaders(customHeaders),
    });
    return response.data || response;
  } catch (error) {
    console.error("AXIOS ERROR:", error);
    throw error.response ? error.response.data : error;
  }
};


// DELETE مع توكن
export const deleteData = async (url, customHeaders = {}) => {
  try {
    const response = await axios.delete(url, {
      headers: getAuthHeaders(customHeaders),
    });
    return response.data || response;
  } catch (error) {
    console.error("AXIOS ERROR:", error);
    throw error.response ? error.response.data : error;
  }
};
