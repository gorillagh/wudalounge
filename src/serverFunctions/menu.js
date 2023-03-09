import { api } from "./index";

export const getMenu = async (authtoken) => {
  return await api.post(
    "/get-menu",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
