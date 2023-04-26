import { api } from "./index";

export const getDishes = async (data) => {
  return await api.post("/dishes", data);
};
