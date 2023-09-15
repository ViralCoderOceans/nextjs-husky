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

//image upload actions--------------------------------------------------------------------------------------------------------------------

export const getAllImages = () =>
  new Promise((resolve, reject) => {
    api.get("files").then((response) => {
      if (response.ok) {
        resolve(response.data.data);
      } else {
        ApiErrors(response);
        reject();
      }
    });
  });

export const uploadFile = (file) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("avatar", file);
    api
      .post("files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.ok) {
          message.success(response.data.message);
          resolve();
        } else {
          // message.error(response.data.message);
          ApiErrors(response);
          reject();
        }
      });
  });

export const downloadFile = (fileName) =>
  new Promise((resolve, reject) => {
    api
      .get(`files/download/${fileName}`, {
        responseType: "blob",
      })
      .then((blob) => {
        message.success("Download started successfully.");
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  });

//graphql to rest api actions--------------------------------------------------------------------------------------------------------------------

export const getAllGames = (id = "") =>
  new Promise((resolve, reject) => {
    api.get(`restApi/v1/games/${id}`).then((response) => {
      if (response.ok) {
        resolve(response.data.data);
      } else {
        ApiErrors(response);
        reject();
      }
    });
  });

export const createOrUpdateGame = (props) =>
  new Promise((resolve, reject) => {
    const { id } = props.game;

    const verb = id ? "put" : "post";
    const url = id ? `restApi/v1/games/${id}` : "restApi/v1/games";

    api[verb](url, JSON.stringify(props)).then((response) => {
      if (response.ok) {
        message.success(response.data.message);
        resolve();
      } else {
        ApiErrors(response);
        reject();
      }
    });
  });

export const deleteGame = (id) =>
  new Promise((resolve, reject) => {
    api.delete(`restApi/v1/games/${id}`).then((response) => {
      if (response.ok) {
        message.success(response.data.message);
        resolve();
      } else {
        ApiErrors(response);
        reject();
      }
    });
  });
