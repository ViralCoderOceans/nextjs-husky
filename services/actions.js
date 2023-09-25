import { ApiErrors, api, getAccessToken } from "./api";
import { message } from "antd";

//Normal CRUD actions--------------------------------------------------------------------------------------------------------------------

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

//Role-base API access actions--------------------------------------------------------------------------------------------------------------------

export const loginUser = (user) =>
  new Promise((resolve, reject) => {
    api.get(`login`, user).then((response) => {
      if (response.ok) {
        message.success(response.data.data.message);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        api.setHeader("Authorization", getAccessToken());
        resolve(response.data.data);
      } else {
        message.error(response.data.data.message);
        ApiErrors(response);
        reject();
      }
    });
  });

export const getUserType = () =>
  new Promise((resolve, reject) => {
    api.get(`data-table/userType`).then((response) => {
      if (response.ok) {
        resolve(response.data.data);
      } else {
        message.error(response.data.data.message);
        ApiErrors(response);
        reject();
      }
    });
  });

export const getAllData = (id = "") =>
  new Promise((resolve, reject) => {
    api.get(`data-table/${id}`).then((response) => {
      if (response.ok) {
        resolve(response.data.data);
      } else {
        message.error(response.data.data.message);
        ApiErrors(response);
        reject();
      }
    });
  });

export const createOrUpdateData = (props) =>
  new Promise((resolve, reject) => {
    const { userId, ...params } = props;
    const formData = new FormData();
    Object.keys(params).forEach((key) => formData.append(key, params[key]));

    const verb = userId ? "put" : "post";
    const url = userId ? `data-table/${userId}` : "data-table";

    api[verb](url, formData).then((response) => {
      if (response.ok) {
        message.success(response.data.data.message);
        resolve();
      } else {
        message.error(response.data.data.message);
        ApiErrors(response);
        reject();
      }
    });
  });

export const deleteData = (id) =>
  new Promise((resolve, reject) => {
    api.delete(`data-table/${id}`).then((response) => {
      if (response.ok) {
        message.success(response.data.data.message);
        resolve();
      } else {
        message.error(response.data.data.message);
        ApiErrors(response);
        reject();
      }
    });
  });

//Login-actions------------------------------------------------------------------------------------------------------------------------------------

export const getUserDetails = (id) =>
  new Promise((resolve, reject) => {
    api.get(`googleLogin/userData/${id}`).then((response) => {
      if (response.ok) {
        resolve(response.data.data);
      } else {
        ApiErrors(response);
        reject();
      }
    });
  });

export const logout = () =>
  new Promise((resolve, reject) => {
    api.post("googleLogin/logout").then((response) => {
      if (response.ok) {
        message.success(response.data.data.message);
        resolve(response.data.data);
      } else {
        ApiErrors(response);
        reject();
      }
    });
  });

export const getGithubUser = (id) =>
  new Promise((resolve, reject) => {
    api.get(`oauth2Login/userData/${id}`).then((response) => {
      if (response.ok) {
        resolve(response.data.data);
      } else {
        ApiErrors(response);
        reject();
      }
    });
  });

export const logoutGithub = () =>
  new Promise((resolve, reject) => {
    api.post("oauth2Login/logout").then((response) => {
      if (response.ok) {
        message.success(response.data.data.message);
        resolve(response.data.data);
      } else {
        ApiErrors(response);
        reject();
      }
    });
  });

//UNI------------------------------------------------------------------------------------------------------------------------------------

export const getUniLocatedAtRegion = (region) =>
  new Promise((resolve, reject) => {
    api
      .get("university/locatedAtRegion", { region: region })
      .then((response) => {
        if (response.ok) {
          resolve(response.data.data);
        } else {
          // message.error(response.data.data.message);
          ApiErrors(response);
          reject();
        }
      });
  });
