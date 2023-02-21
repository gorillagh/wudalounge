import axios from "axios";
import ReactDOM from "react-dom/client";
import SessionExpired from "../components/PopUps/SessionExpired";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response) => {
    console.log("response---->", response);
    return response;
  },
  (error) => {
    console.log("Error----.>", error.response.status);
    if (error.code === "ERR_NETWORK") {
      window.alert("Please check you internet connection and try again.");
    }
    if (error.response.status === 401) {
      const div = document.createElement("div");
      div.setAttribute("id", "alertDiv");
      document.body.appendChild(div);
      const alert = ReactDOM.createRoot(document.getElementById("alertDiv"));

      alert.render(<SessionExpired open={true} />);
      return;
    }
  }
);

export const AxiosErrorAlert = (props) => {
  function handleErrorAlert() {
    props.setAlertSnackbar({
      open: true,
      text: "Bad Internet Connections",
      severity: "error",
    });
  }

  return <div style={{ display: "none" }}></div>;
};
