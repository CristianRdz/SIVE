import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { API_URL } from "../../../utils/constants";
import { Toast } from "react-native-toast-message/lib/src/Toast";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [theme, setTheme] = useState("system");
  const [textSize, setTextSize] = useState("medium");
  const login = (username, password) => {
    setIsLoading(true);
    axios
      .post(`${API_URL}/api/auth/login/`, {
        email: username,
        password: password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Bienvenido",
          text2: "Has iniciado sesión correctamente",
        });
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setIsLoading(false);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al iniciar sesión",
          text2: "Ha ocurrido un error al iniciar sesión, intentelo mas tarde",
        });
      });
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("userInfo");
    setUserInfo({});
    setIsLoading(false);
    Toast.show({
      type: "success",
      position: "top",
      text1: "Sesión cerrada",
      text2: "Has cerrado sesión correctamente",
    });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let theme = await AsyncStorage.getItem("theme");
      let textSize = await AsyncStorage.getItem("textSize");
      if (theme) {
        setTheme(theme);
      }
      if (textSize) {
        setTextSize(textSize);
      }
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserInfo(userInfo);
      } else {
        setUserInfo({});
      }
      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect( () => {
    const checkTheme = async () => {
     if (theme.valor) {
       setTheme(theme.valor);
       await AsyncStorage.setItem("theme", theme.valor);
     }
     }
     checkTheme();
   }, [theme]);
   async function changeTextSize(size) {
     // que no sea undefined
      if (size) {
        setTextSize(size);
        await AsyncStorage.setItem("textSize", size);
      }
   }
   useEffect( () => {
    const checkTextSize = async () => {
      if (textSize.valor && textSize.valor !== "undefined") {
        setTextSize(textSize.valor);
        await AsyncStorage.setItem("textSize", textSize.valor);
      }
      }
     checkTextSize();
   }
    , [textSize]);


  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        login,
        logout,
        theme,
        setTheme,
        textSize,
        setTextSize,
        changeTextSize,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
