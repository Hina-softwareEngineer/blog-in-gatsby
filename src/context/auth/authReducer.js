export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,

        ...state,
        ...action.payload,
        isLoading: true,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_SUCCESSFULLY":
      localStorage.setItem("token", action.payload.accessToken);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };
    case "LOGIN FAILED":
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload.message,
      };
    case "SIGN_OUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};
