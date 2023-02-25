import { api } from "./index";

export const getDishes = async () => {
  return await api.get("/dishes");
};
