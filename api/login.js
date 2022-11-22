import axios from "./index";

const login = (data) =>
  axios({
    method: "GET",
    url: "",
    data,
  });

export { login };
