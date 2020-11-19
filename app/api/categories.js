import Client from "./client";

const endpoint = "/categories";

const getCategories = () => Client.get(endpoint);

export default {
  getCategories,
};
