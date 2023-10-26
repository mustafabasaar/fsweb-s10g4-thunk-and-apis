import axios from "axios";
import { toast } from "react-toastify";

export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = (info) => {
  return { type: FAV_ADD, payload: info };
};

export const removeFav = (id) => {
  return { type: FAV_REMOVE, payload: id };
};

export const fetchAnother = () => (dispatch) => {
  console.log("fetchAnother");
  const loadingToast = toast.loading("Please wait...", {
    autoClose: 2000,
    closeOnClick: true,
  });
  dispatch(fetchLoading());
  setTimeout(() => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((res) => {
        console.log(res);
        toast.update(loadingToast, {
          render: "All is good",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          closeOnClick: true,
        });
        dispatch(fetchSucces(res.data.message));
      })
      .catch((err) => {
        console.error(err);
        toast.update(loadingToast, {
          render: "All is Bad",
          type: "error",
          isLoading: false,
          closeOnClick: true,
        });
        dispatch(fetchError(err.message));
      });
  }, 2000);
};

const fetchSucces = (data) => {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  };
};
const fetchLoading = () => {
  return {
    type: FETCH_LOADING,
  };
};
const fetchError = (message) => {
  return {
    type: FETCH_ERROR,
    payload: message,
  };
};
