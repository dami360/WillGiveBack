import axios from "axios";
const apiAddress = "http://localhost:8000";

export default class ServerConnection {
  static async signUp(login, email, password, rpassword) {
    const emailRegex = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (!emailRegex) {
      return { errMess: "Wrong email" };
    }

    if (password !== rpassword) {
      return { errMess: "Passwords are not the same" };
    }

    if (String(password).length < 8) {
      return { errMess: "Password is too shorts" };
    }

    const response = await axios(`${apiAddress}/api/accounts/new`, {
      method: "post",
      data: {
        login: login,
        email: email,
        password: password,
      },
      withCredentials: true,
    })
      .catch((error) => {
        return { err: error };
      })
      .then((res) => {
        res = res.data;

        if (res.errMess) {
          return { errMess: res.errMess };
        }

        if (res.err || !res.state) {
          console.log(res);

          return { errMess: "Server error, try again later" };
        }

        return { state: "Account added" };
      });

    return response;
  }

  static async isLogged() {
    const response = await axios(`${apiAddress}/api/accounts/is-logged`, {
      method: "post",
      data: {},
      withCredentials: true,
    })
      .catch((error) => {
        return { err: error };
      })
      .then((res) => {
        return res.data;
      });

    console.log(response);
    return response;
  }

  static async signIn(login, password, stayLogged) {
    const response = await axios(`${apiAddress}/api/accounts/sign-in`, {
      method: "post",
      data: {
        login: login,
        password: password,
        stayLogged: stayLogged,
      },
      withCredentials: true,
    })
      .catch((error) => {
        return { err: error };
      })
      .then((res) => {
        return res.data;
      });

    console.log(response);
    return response;
  }
}
