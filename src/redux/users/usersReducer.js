const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || "",
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "users/LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "users/LOGOUT":
      return {
        ...state,
        user: "",
      };
    case "users/FETCH_ALL_USERS":
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
