import { message } from "antd";

const API_SERVER = location.host.startsWith('localhost') ? 'http://localhost:8080/' : 'http://106.14.140.55:8080/';

class ApiError extends Error {
  constructor(status, body) {
    super(`Api call failed: ${status}`);
    this.status = status;
    this.body = body;
  }
}

async function processResponse(response) {
  return Promise.resolve(response)
    .then(async (response) => ({
      response,
      body: await response.json(),
    }))
    .then((result) => {
      if (result.response.status < 200 || result.response.status >= 400)
        throw new ApiError(result.response.status, result.body);
      return result.body;
    })
    .catch((ex) => {
      if (ex instanceof ApiError)
        message.error(ex.body.error);
      throw ex;
    });
}

export async function request(path, body) {
  const response = await fetch(API_SERVER + path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return processResponse(response);
}
