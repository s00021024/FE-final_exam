const API_URL = "http://localhost:3001";

const fetchCarsLoading = () => ({
  type: "cars/FETCHCARSLOADING",
})

const fetchCarsOk = (cars) => ({ 
  type: "cars/FETCHCARSOK", 
  payload: cars 
});

const fetchCarsError = (error) => ({
type: "cars/FETCHCARSERROR",
payload: error
})

export const fetchCars = () => async (dispatch) => {
  dispatch(fetchCarsLoading())
  await new Promise(res => setTimeout(res, 1000)) //fake timeout
  try {
    const response = await fetch(`${API_URL}/cars`);
    if (!response.ok)
      throw new Error("🥵 Error loading the catalog.");
    const data = await response.json();
console.log("✅ Catalog loaded successfully.",data);
    dispatch(fetchCarsOk(data));
  } catch (error) {
    dispatch(fetchCarsError("🥵 " + error.message))
  }
}


export const addCar = carData => { 
  return async () => {
  try {
    const response = await fetch(`${API_URL}/cars`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carData)
      })
      const data = await response.json()
      console.log("🏎 👉🏻", data);
      return{success:true}
      
    } catch (error) {
      console.error("🥵 Error adding the new car: ", error);
      return {success: false, message: "error connecting to database"}
  }
}}


export const updateCar = (id, carData) => {
  return async () => {
  try {
      const response = await fetch(`${API_URL}/cars/${id}`,
      {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(carData)
      })
      const data = await response.json()
      console.log("🔥 👉🏻", data)
      return{success:true}

  } catch (error) {
      console.error("🥵 Error in car editing: ", error);
      return {success: false, message: "error connecting to database"}
  }
}}

export const deleteCar = (id) => { 
  return async (dispatch) => {
  try {
      const response = await fetch(`${API_URL}/cars/${id}`, {
          method: 'DELETE',
      });

      if (response.ok) {
          dispatch({
              type: 'DELETECAR',
              payload: id
          });
      }
      return{success:true}
  } catch (error) {
    console.error("🥵 Error in car deleting: ", error)
    return {success: false, message: "error connecting to database"}
  }
}}