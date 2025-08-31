import { useReducer } from "react";
import { toast } from "react-toastify";
import {
  setExpirationDate,
  getUserFromLocalStorage,
} from "../helpers/checkExpiration";
import { redirect } from "react-router-dom";

const initialState = {
  user: getUserFromLocalStorage() || null,
};
const actions = Object.freeze({
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
});

const reducer = (state, action) => {
  if (action.type == actions.SET_USER) {
    return { ...state, user: action.user, token: action.token };
  }
  if (action.type == actions.LOGOUT) {
    return { ...state, user: null, token: null };
  }
  return state;
};

const useAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = async (userInfo) => {
    const payload = {
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
      address: userInfo.address,
      phone: userInfo.phone,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.error) {
        toast.error(result.error);
      } else {
        dispatch({ type: actions.SET_USER, user: result.user, token: result.token });
        const rawToken = result.token;
        const token = rawToken.substring(rawToken.indexOf("|") + 1);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success(result.message || "Registration successful");
      }
    } catch (error) {
      toast.error("There was a problem registering, try again");
    }
  };

  const login = async (userInfo) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const user = await response.json();
      if (user.error) {
        toast.error(user.error);
      }
      if (user.user) {
        dispatch({ type: actions.SET_USER, user: user.user, token: user.token });
        localStorage.setItem("user", JSON.stringify(user.user));
        const rawToken = user.token; // ví dụ "18|RqconXG31084jJUuUBpurOkhDswInK4U7uheeKqae8d1940a"
        const token = rawToken.split("|")[1]; // lấy phần sau dấu "|"
        localStorage.setItem("token", token);
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error("There was a problem logging in, try again");
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (result.error) {
        toast.error(result.error);
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        dispatch({ type: actions.LOGOUT });
        toast.success(result.message || "Logout success!");
      }
    } catch (error) {
      toast.error("There was a problem logout, try again");
    }
  };

  return { state, register, login, logout };
};

export default useAuth;
