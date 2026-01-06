import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../redux/users/usersActions';
import { fetchUserOrders } from '../redux/cart/orderActions';
import { FaArrowLeft, FaArrowRightFromBracket, FaCartShopping, FaCircleUser } from 'react-icons/fa6';


const Client = () => {
  const user = useSelector(state => state.users.user);
  const orders = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders(user.id));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    localStorage.removeItem('lastViewedCar');
    dispatch(logout());
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
      <div>Error: {error}</div>
      <button onClick={() => navigate("/cars")} className="bg-sky-600 px-10 py-5 text-slate-50 border border-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all duration-300 rounded-2xl cursor-pointer uppercase text-xs">back</button>
    </div>

  }

  const userOrders = orders.filter(order => order.userId === user.id);

  return (
    <div className="h-auto bg-sky-50 py-12 px-4 rounded-2xl">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/cars")}
            className="flex items-center gap-2 font-medium text-slate-500 hover:text-sky-600 transition-all cursor-pointer uppercase text-xs"
          ><FaArrowLeft />back to catalog</button>
          <button
            onClick={handleLogout}
            className="flex gap-2 items-center bg-slate-600 px-5 py-2 text-white border text-sm hover:bg-slate-50 hover:text-slate-600 hover:border-slate-600 transition-all duration-300 rounded-2xl cursor-pointer"
          >logout<FaArrowRightFromBracket />
          </button>
        </div>

        <div className="bg-sky-500 rounded-2xl p-8 mb-10 flex justify-between items-center gap-6 shadow-lg shadow-sky-200">
          <div className="flex gap-2 items-center bg-slate-600 p-5 rounded-full text-white">
            <FaCircleUser size={50} />
            <h1 className="text-4xl font-bold italic capitalize">Welcome, {user.username}</h1>
          </div>
          <div className="text-right">
            <ul className="text-sky-100 text-lg">
              <li>
                id: <span className='font-bold'>{user.id}</span>
              </li>
              <li>
                email: <span className='font-bold'>{user.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
            <FaCartShopping className="text-sky-500" size={24} />
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wide">Order history</h2>
          </div>

          {userOrders.length === 0 ? (
            <p className="text-slate-400 italic text-center py-10">Your order history is empty.</p>
          ) : (
            <div className="space-y-4">
              {userOrders.map((order) =>
                order.item.map((item) => (
                  <div key={item.id} className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-4 hover:bg-sky-50 transition-all">
                    <img
                      src={item.image_url}
                      className="w-20 h-20 object-contain rounded-lg mr-6 border border-white shadow-sm"
                      alt={item.model}
                    />
                    <div className="grow">
                      <p className="text-slate-900 font-bold">{item.brand} {item.model}</p>
                      <p className="text-slate-400 text-xs">Order ID: #{item.id}</p>
                      <div className="mt-2 text-slate-600 text-sm">
                        Quantity: <span className="font-bold">{item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-slate-900">
                        €{(item.price * item.quantity).toLocaleString()}
                      </div>
                      <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md uppercase">
                        Complete
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Client;