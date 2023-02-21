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
