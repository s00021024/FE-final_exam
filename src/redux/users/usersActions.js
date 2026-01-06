const API_URL = "http://localhost:3001";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const checkEmail = await fetch(`${API_URL}/users?email=${userData.email}`);
        const existingEmail = await checkEmail.json();
        if (existingEmail.length > 0) {
            return { success: false, message: "email already exists" };
        }

        const checkUsername = await fetch(`${API_URL}/users?username=${userData.username}`);
      const existingUsername = await checkUsername.json();
      if (existingUsername.length > 0) {
        return { success: false, message: "this username already exists" };
      }

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData, role: "client" }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
        dispatch({ 
          type: 'users/REGISTEROK',
          payload: data
        });
        return {success: true}
  } catch (error) {
    console.error("Registration error:", error);
    return {success: false, message: "error connecting to database"}
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(
      `${API_URL}/users?email=${email}&password=${password}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const user = data[0];

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: "users/LOGIN",
        payload: user,
      });
      return user;
    } else {
      throw new Error("Wrong credentials, user not found");
    }
  } catch (error) {
    console.log("invalid credentials");
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  return { type: "users/LOGOUT" };
};

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();

    dispatch({
      type: "users/FETCH_ALL_USERS",
      payload: data,
    });
  } catch (error) {
    console.error("User loading error:", error);
  }
};
