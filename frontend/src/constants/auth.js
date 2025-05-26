import _ from "lodash";

export const checkAdmin = (user) => {
  return _.get(user, "role") === "admin" ?? true;
};
