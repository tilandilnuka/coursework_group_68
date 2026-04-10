import fetch from "isomorphic-fetch";
import axios from "axios";
import queryString from "query-string";
import { removeCookie, removeLocalStorage } from "./auth";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

export const getProfile = (id, token) => {
  let url = `${API}/users/${id}`;

  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const updateProfile = (id, user, token) => {
  let url = `${API}/users/${id}`;

  return fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const updateUserPassword = (id, user, token) => {
  let url = `${API}/users/updateMyPassword/${id}`;

  return fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const logOutUser = async (next) => {
  removeCookie("token_user");
  removeLocalStorage("user");

  let url = `${API}/users/logout`;

  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const getAllUsers = (paramsData, token) => {
  let url = `${API}/users`;
  let userRole;

  return axios(url, {
    method: "GET",
    params: {
      page: paramsData.page,
      limit: paramsData.limit,
      role: paramsData.role,
      sort: paramsData.sort,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const oneUser = (id) => {
  let url = `${API}/users/${id}`;

  return axios(url, {
    method: "GET",
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const updateProduct = async (id, data, token) => {
  console.log(id, data, token);
  let url = `${API}/users/${id}`;

  return fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const deleteUser = async (id, token) => {
  let url = `${API}/users/${id}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const searchUsers = (params) => {
  let query = queryString.stringify(params);
  let url = `${API}/users/search?${query}`;

  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
