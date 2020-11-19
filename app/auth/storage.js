import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import logger from "../utility/logger";

const key = "authToken";
const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    logger.log("Error storing the auth token.", error);
  }
};

const getToekn = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    logger.log("Error fetching the auth token", error);
  }
};

const removeToekn = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    logger.log("Error deleting the token", error);
  }
};

const getUser = async () => {
  const token = await getToekn();
  return token ? jwtDecode(token) : null;
};

export default {
  storeToken,
  getToekn,
  getUser,
  removeToekn,
};
