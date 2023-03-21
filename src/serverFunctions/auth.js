import { api } from "./index";

export const createOrUpdateUser = async (authtoken, data) => {
  return await api.post(`/create-or-update-user`, data, {
    headers: {
      authtoken,
    },
  });
};

export const googleLogin = async (authtoken) => {
  return await api.post(
    `/google-login`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const loginUser = async (authtoken) => {
  return await api.post(
    `/login-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await api.post(
    `/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await api.post(
    `/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentStaff = async (authtoken) => {
  return await api.post(
    `/current-staff`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const checkEmailAvailability = async (email) => {
  return await api.post(
    `/check-email-availability`,
    {},
    {
      headers: {
        email,
      },
    }
  );
};

export const updateUser = async (authtoken, update, slug) => {
  return await api.post(`/update-user/${slug}`, update, {
    headers: {
      authtoken,
    },
  });
};
