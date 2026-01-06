const initialState = {
  list: [],
  isLoading: false,
  featured: [],
  error: null,
};

export const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case "cars/FETCHCARSLOADING":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "cars/FETCHCARSOK":
      return {
        ...state,
        isLoading: false,
        list: action.payload,
        featured: [...action.payload].sort(() => Math.random() - 0.5).slice(0, 3) 
      };
    case "cars/FETCHCARSERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "cars/DELETECAR":
      return {
        ...state,
        list: state.list.filter((car) => car.id !== action.payload),
      };
    default:
      return state;
  }
};
