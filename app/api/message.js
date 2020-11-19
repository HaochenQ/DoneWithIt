import client from "./client";

const endpoint = "/messages";

const send = (message) => client.post(endpoint, message);

export default {
  send,
};
