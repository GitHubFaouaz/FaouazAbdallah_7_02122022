import * as AuthApi from "../api/AuthRequests";

export const sign_Up = (formData) => async (dispatch) => {
  dispatch({ type: "Auth_NewUser" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "Auth_Succes", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "Auth_Fail" });
  }
};

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "Auth_Start" }); // le nom du dispatch dans le store
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "Auth_Succes", data: data }); // 2eme data est celui de la haut
  } catch (error) {
    console.log(error);
    dispatch({ type: "Auth_Fail" });
  }
};
