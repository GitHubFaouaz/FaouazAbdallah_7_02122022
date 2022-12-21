// const initialState = {}; //il est vide au debut
const authReducer = (
  state = {
    // des parametres que l'on met
    authData: null,
    loading: false,
    error: false /*updateLoading: false */,
  },
  action
) => {
  switch (action.type) {
    case "Auth_Start":
      return { ...state, loading: true, error: false }; // loading est true pour le chargement si necessaire
    case "Auth_Succes":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data })); // s'il ya une action auth reussite(access) alors enregistre dans le localstorage
      //La méthode JSON.stringify() convertit une valeur JavaScript en chaîne JSON
      return {
        ...state, // retourn deja le state pour ne pas ecrasé les donnée de l'utilisateur , que l'on est pas que la photo on recupere ceux qu'il y a deja
        authData: action.data, // data: data que l'on reçois dans action
        loading: false, //apres une reussi de connection il redevient false comme au debut
        error: false,
      };
    case "Auth_Fail":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default authReducer;
