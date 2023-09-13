import { create } from "apisauce";
import { message } from "antd";
import { BASE_URL } from "../constants/constants";

export const api = create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer helloWorld",
  },
  withCredentials: true,
});

export const ApiErrors = (response, warningDuration = 3) => {
  let localReturn = "";

  if (response.problem) {
    if (response.problem === "NETWORK_ERROR") {
      localReturn +=
        "Your device does not appear to be connected to the Internet. \n";
      localReturn += "Please, check your connection and try again.";
    }

    if (response.problem === "CONNECTION_ERROR") {
      localReturn += "Could not connect to the server. \n";
      localReturn += "Please, check your connection and try again.";
    }

    if (response.problem === "TIMEOUT_ERROR") {
      localReturn += "The server did not respond. \n";
      localReturn += "Please, check your connection and try again.";
    }
  }

  if (localReturn === "") {
    response?.data?.errors?.forEach((element) => {
      if (element?.msg?.length > 0) {
        message.warning(element.msg, warningDuration);
      }
    });
  } else {
    message.warning(localReturn, warningDuration);
  }

  return localReturn;
};
