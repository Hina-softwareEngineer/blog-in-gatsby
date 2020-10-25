export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOADED":
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case "LOADING":
      return {
        ...state,
        ...action.payload,
        isLoading: false,
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
        user: action.payload.email,
        error: null,
      };
    case "LOGIN_FAILED":
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
