import { loginFailure, loginStart, loginSuccess } from "./authRedux";

import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
    window.location.reload();
  } catch (error) {
    dispatch(loginFailure());
  }
};
