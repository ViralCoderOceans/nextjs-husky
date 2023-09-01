import { ApiErrors, api } from "./api";
import { message } from "antd";

export const getAllUser = (id = "") =>
  new Promise((resolve, reject) => {
    api.get(`users/${id}`).then((response) => {
      if (response.ok) {
        resolve(response.data.data);
      } else {
        ApiErrors(response);
        reject();
      }
    });
  });

export const createOrUpdateUser = (props) =>
  new Promise((resolve, reject) => {
    const { userId, ...params } = props;
    const formData = new FormData();
    Object.keys(params).forEach((key) => formData.append(key, params[key]));

    // If id, so we have to update the record, or we're gonna create
    const verb = userId ? "put" : "post";
    const url = userId ? `users/${userId}` : "users";

    api[verb](url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      if (response.ok) {
        message.success(response.data.data.message);
        resolve();
      } else {
        ApiErrors(response);
        reject();
      }
    });
  });

export const deleteUser = (id) =>
  new Promise((resolve, reject) => {
    api.delete(`users/${id}`).then((response) => {
      if (response.ok) {
        message.success(response.data.data.message);
        resolve();
      } else {
        ApiErrors(response);
        reject();
      }
    });
  });
