import axios from "axios";

type methodType = "GET" | "POST" | "PUT" | "DELETE";

interface IfetchData {
  url: string;
  method?: methodType;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export const fetchData = async (
  config: IfetchData
): Promise<[boolean, any]> => {
  const { url, method = "GET", headers = {}, params = {} } = config;
  const apiUrl = import.meta.env.VITE_API_URL;
  const fullUrl = new URL(url, apiUrl).toString();
  headers["Accept"] = "application/json";
  headers["Content-Type"] = "application/json";
  let result: [boolean, any] = [true, {}];
  try {
    const response = await axios({
      method,
      url: fullUrl,
      headers,
      params,
    });

    if (response && response.data) {
      result = [false, response.data];
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("401");
      result = [true, error.response ? error.response.data : error.message];
    } else if (error instanceof Error) {
      console.error("General error:", error.message);
      result = [true, error.message];
    } else {
      console.error("Unknown error:", error);
      result = [true, "An unknown error occurred"];
    }
  }
  return result;
};
