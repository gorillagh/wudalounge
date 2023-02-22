import { api } from "./index";

export const getDashboardBriefs = async (authtoken) => {
  return await api.post(
    `/admin/dashboard-briefs`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const uploadDishImage = async (authtoken, uri) => {
  return await api.post(
    `/admin/upload-dish-image`,
    {
      uri,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};
