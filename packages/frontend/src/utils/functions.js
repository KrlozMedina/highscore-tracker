import { clearToken, selectToken } from "hst/store/slices/token.slices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

function getToken() {
  return useSelector(selectToken);
}

function validateExpireToken(token, dispatch) {
  if(token !== undefined) {
    const tokenExpiration = token.exp * 1000;

    if (!tokenExpiration || Date.now() > tokenExpiration) {
      dispatch(clearToken());
      goToLogin();
    }
  } else {
    goToLogin();
  }
}

const goToLogin = () => {
  window.location.href = "/auth/login";
}

const logOutSession = (dispatch) => {
  dispatch(clearToken());
  goToLogin();
}

export { parseJwt, getToken, validateExpireToken, logOutSession };
