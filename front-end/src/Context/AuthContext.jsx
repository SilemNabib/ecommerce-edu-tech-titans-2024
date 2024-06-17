import axios from "axios";
import { createContext, useContext } from "react";
import { ApiConfig } from "../config/ApiConfig";
import * as jwt_decode from "jwt-decode";

const token = localStorage.getItem("authToken");

const isTokenExpired = (token) => {
  try {
    const { exp } = jwt_decode.jwtDecode(token);
    if (exp < Date.now() / 1000) {
      return true;
    }
    return false;
  } catch (e) {
    return true;
  }
};


if (token && !isTokenExpired(token)) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const isAuthenticated = () => {
  return axios.defaults.headers.common["Authorization"] || (localStorage.getItem("registerToken") && !isTokenExpired(localStorage.getItem("registerToken")));
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const user = localStorage.getItem("user");

  const setAuthHeader = (token) => axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const requestLogin = ({data, then, on_error, final}) => {
    axios.post(ApiConfig.auth.login, data)
    .then((response) => {
      const { token } = response.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      localStorage.setItem("user", response.data.user);
      localStorage.setItem("authToken", token);
      if(then){
        then(response);
      }
    })
    .catch((error) => {if(on_error) on_error(error)})
    .finally(() => {if (final) final()});
  };

  const requestRegister = ({data, then, on_error, final}) => {
    axios
      .post(ApiConfig.auth.register, data)
      .then((response) => {

        localStorage.setItem("registerToken", response.data.token);
        if(then){
          then(response);
        }
      })
      .catch((error) => {if(on_error) on_error(error)})
      .finally(() => {if (final) final()});
  }

  const requestVerify = ({data, then, on_error, final}) => {
    axios
      .post(ApiConfig.auth.verify, data)
      .then((response) => {
        localStorage.setItem("registerToken", response.data.token);
        // No se que más retorne, tengo que ver
        if(then){
          then(response);
        }
      })
      .catch((error) => {if(on_error) on_error(error)})
      .finally(() => {if (final) final()});
  }

  const requestComplete = ({data, then, on_error, final}) => {
    axios
      .post(ApiConfig.auth.complete, data)
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
        // No se que más retorne, tengo que ver
        
        if(then){
          then(response);
        }
      })
      .catch((error) => {if(on_error) on_error(error)})
      .finally(() => {if (final) final()});
  }

  const requestLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("registerToken");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  const authFetch = async (url, options = {}) => {
    return axios(url, options);
  };

  return (
    <AuthContext.Provider
      value={{
        requestLogin,
        requestRegister,
        requestVerify,
        requestComplete,
        requestLogout,
        isAuthenticated,
        setAuthHeader,
        authFetch,
        isTokenExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
