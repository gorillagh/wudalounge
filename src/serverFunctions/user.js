import axios from "axios";

export const getUser = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/get-user/${id}`);
};

export const addToNotificationList = async (email) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/add-to-notification-list`,
    { email }
  );
};

export const changeFavorites = async (userId, dishId, action) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/change-favorites`, {
    userId,
    dishId,
    action,
  });
};
