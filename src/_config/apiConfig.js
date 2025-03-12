export const STRAPI_URL = "https://pouchesworldwide.com/strapi/api";


export async function sendJsonPostRequest(
  url,
  jsonBody = {},
  headers = {},
  useBaseUrl = true
) {
  if (useBaseUrl) {
    url = STRAPI_URL + url;
  }
  const headers_= headers;
  // if (localStorage.getItem("auth-token")) {
  //   headers_["Authorization"] = `Bearer ${localStorage.getItem("auth-token")}`;
  // }
  headers_["Content-Type"] = "application/json";

  let response = null;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: headers_,
      body: JSON.stringify(jsonBody),
      credentials: "same-origin",
    });
  } catch {
    return {
      status: "error",
      message: "Failed to connect to the servers.",
      data: null,
    };
  }

  let data_;
  try {
    data_ = await response.json();
    return {
      status: data_.status,
      data: data_.data ?? data_.error,
      message: data_.message ?? null,
    };
  } catch {
    return { status: "error", message: "Something went wrong.", data: null };
  }
}

export async function sendGetRequest(
  url,
  params = {},
  headers = {},
  useBaseUrl = true
) {
  if (useBaseUrl) {
    url = STRAPI_URL + url;
  }
  const headers_ = headers;
  // if (localStorage.getItem("auth-token")) {
  //   headers_["Authorization"] = `Bearer ${localStorage.getItem("auth-token")}`;
  // }
  let response = null;
  try {
    if (params) url = url + "?" + new URLSearchParams(params);
    response = await fetch(url, {
      method: "GET",
      headers: headers_,
      credentials: "same-origin",
    });
  } catch {
    return {
      status: "error",
      message: "Failed to connect to the servers.",
      data: null,
    };
  }

  let data_;
  try {
    data_ = await response.json();
    return {
      status: "success",
      data: data_.data ?? data_.error,
      message: data_.message ?? null,
    };
  } catch {
    return { status: "error", message: "Something went wrong.", data: null };
  }
}

export async function sendDeleteRequest(
  url,
  jsonBody = {},
  headers = {},
  useBaseUrl = true
) {
  if (useBaseUrl) {
    url = STRAPI_URL + url;
  }
  const headers_ = headers;
  // if (localStorage.getItem("auth-token")) {
  //   headers_["Authorization"] = `Bearer ${localStorage.getItem("auth-token")}`;
  // }
  headers_["Content-Type"] = "application/json";

  let response= null;
  try {
    const body = {
      method: "DELETE",
      headers: headers_,
      credentials: "same-origin",
    };
    if (jsonBody) body["body"] = JSON.stringify(jsonBody);

    response = await fetch(url, body);
  } catch {
    return {
      status: "error",
      message: "Failed to connect to the servers.",
      data: null,
    };
  }

  let data_;
  try {
    data_ = await response.json();
    return {
      status: "success",
      data: data_.data ?? data_.error,
      message: data_.message ?? null,
    };
  } catch {
    return { status: "error", message: "Something went wrong.", data: null };
  }
}

export async function sendJsonPatchRequest(
  url,
  jsonBody = {},
  headers = {},
  useBaseUrl = true
) {
  if (useBaseUrl) {
    url = STRAPI_URL + url;
  }
  const headers_ = headers;
  // if (localStorage.getItem("auth-token")) {
  //   headers_["Authorization"] = `Bearer ${localStorage.getItem("auth-token")}`;
  // }
  headers_["Content-Type"] = "application/json";

  let response = null;
  try {
    response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(jsonBody),
      headers: headers_,
      credentials: "same-origin",
    });
  } catch {
    return {
      status: "error",
      message: "Failed to connect to the servers.",
      data: null,
    };
  }

  let data_;
  try {
    data_ = await response.json();
    return {
      status: "success",
      data: data_.data ?? data_.error,
      message: data_.message ?? null,
    };
  } catch {
    return { status: "error", message: "Something went wrong.", data: null };
  }
}