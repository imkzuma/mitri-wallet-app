import axios from "axios";

export const WalletApi = axios.create({
  baseURL: "https://663476059bb0df2359a19645.mockapi.io/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});
