import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { updateFailed, updateList } from "./wishlistRedux";
import { handleError } from "../utils/errorHandler";

export const login = async (dispatch, user, setNotify) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(handleError(error.response.data)));
    setNotify(true);
  }
};

export const updateWishlist = async (dispatch, user, productId) => {
  try {
    await userRequest.post(`/wishlist/add`, {
      userId: user._id,
      productId,
    });
    const res = await userRequest.get(`/wishlist/${user._id}`);
    dispatch(updateList(res.data.wishlist));
  } catch (error) {
    dispatch(updateFailed());
  }
};
