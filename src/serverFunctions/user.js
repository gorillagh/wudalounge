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
