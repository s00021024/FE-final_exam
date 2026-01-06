import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchCars } from '../redux/car/carActions';
import { addToCart } from '../redux/cart/cartActions';
import { Slab } from 'react-loading-indicators';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaCar, FaCartPlus, FaTools } from 'react-icons/fa';

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const car = useSelector(state => state.cars.list.find(c => String(c.id) === String(id)))
  const { isLoading } = useSelector((state) => state.cars)
  const user = useSelector(state => state.users.user)

  useEffect(() => {
    localStorage.setItem('lastViewedCar', id)
    dispatch(fetchCars(id));
  }, [dispatch, id]);

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addToCart(car))
    toast.success(`${car.brand} ${car.model} added to cart!`)
    navigate("/cart")
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Slab color="#0096C0" size="large" text="loading car details..." textColor="" />
      </div>
    )
  } else if (!car) {
    return (<div className="m-20 text-center p-10 bg-white rounded-3xl">
      <p className="text-2xl font-bold text-slate-800 mb-6">Car not found.</p>
      <button onClick={() => navigate("/cars")} className="bg-sky-600 px-10 py-5 text-slate-50 border border-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all duration-300 rounded-2xl cursor-pointer uppercase text-xs">back</button>
    </div>)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:py-12">

      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate("/cars")}
          className="flex items-center gap-2 font-medium text-slate-500 hover:text-sky-600 transition-all cursor-pointer uppercase text-xs"
        ><FaArrowLeft />back to catalog</button>
        {user.role === "admin" && (
          <button
            onClick={() => navigate(`/admin/edit-car/${car.id}`)}
            className="flex items-center gap-2 bg-sky-200 p-6 text-2xl rounded-2xl hover:bg-sky-600 hover:text-white transition-all cursor-pointer"
            title="Edit Car"
          ><FaTools /><FaCar /></button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-12 items-start">

        <div className="relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 p-8">
          <img
            src={car.image_url}
            alt={car.model}
            className="w-full h-auto object-contain hover:scale-110 transistion-all duration-300"
          />
          {!car.is_available && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
              <span className="bg-red-600 text-white px-8 py-3 rounded-full font-extrabold text-2xl rotate-12 shadow-2xl">SOLD OUT</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <span className="text-sky-600 font-bold uppercase">{car.brand}</span>
            <h1 className="text-5xl capitalize font-bold text-slate-900 mt-2">{car.model}</h1>
            <p className="text-slate-400 text-lg font-medium mt-1">{car.year}</p>
          </div>

          <div className="text-3xl font-extrabold text-sky-600">
            €{car.price.toLocaleString()}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-xs text-slate-400 font-bold uppercase">Mileage</p>
              <p className="text-lg font-bold text-slate-800">{car.mileage_km.toLocaleString()} km</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-xs text-slate-400 font-bold uppercase">Transmission</p>
              <p className="text-lg font-bold text-slate-800 uppercase">{car.transmission}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-xs text-slate-400 font-bold uppercase">Fuel Type</p>
              <p className="text-lg font-bold text-slate-800 uppercase">{car.fuel_type}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-xs text-slate-400 font-bold uppercase">Status</p>
              <p className={`text-lg font-bold uppercase ${car.is_available ? 'text-green-600' : 'text-red-600'}`}>
                {car.is_available ? 'available' : 'unavailable'}
              </p>
            </div>
          </div>

          <div className="mt-4">
            {user.role === "client" && car.is_available && (
              <button
                onClick={handleAddToCart}
                className="flex justify-center items-center gap-3 w-full py-3 px-4 bg-sky-600 text-slate-50 shadow-2xl shadow-sky-400/50 hover:shadow-2xl/60 hover:bg-sky-800 font-bold rounded-xl transition-all duration-300 hover:scale-101 active:scale-95 cursor-pointer">ADD TO CART<span className="text-3xl"><FaCartPlus /></span>
              </button>
            )}

            {!user && car.is_available && (
              <div
                onClick={() => navigate('/register')}
                className="cursor-pointer group bg-sky-50 border-2 border-dashed border-sky-200 p-6 rounded-2xl text-center hover:bg-sky-100 transition-all"
              >
                <p className="text-sky-700 font-bold text-lg">
                  register or login to buy this car
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CarDetails;
