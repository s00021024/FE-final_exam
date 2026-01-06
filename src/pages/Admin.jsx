import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { fetchAllUsers, logout } from '../redux/users/usersActions';
import { fetchAllOrders } from '../redux/cart/orderActions';
import { fetchCars } from '../redux/car/carActions';
import { FaCar, FaCartShopping, FaEuroSign, FaPlus, FaRightFromBracket, FaArrowLeft, FaUserGear, FaFileInvoice } from 'react-icons/fa6';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const cars = useSelector((state) => state.cars.list);
  const orders = useSelector((state) => state.orders.orders);
  const allUsers = useSelector((state) => state.users.list);
  const findUsers = allUsers || [];

  useEffect(() => {
    if (user && user.role === 'admin') {
      dispatch(fetchAllOrders());
      dispatch(fetchCars());
      dispatch(fetchAllUsers());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-10 border-2 border-red-200 text-center rounded-2xl shadow-sm">
          <p className="text-red-600 font-bold uppercase">Access restricted to adminstrators.</p>
          <button onClick={() => navigate('/')} className="mt-4 text-slate-500 underline cursor-pointer">back</button>
        </div>
      </div>
    );
  }

  const totalProfit = orders.reduce((acc, order) => {
    const subTotal = order.item.reduce((subAcc, item) => subAcc + (item.price * item.quantity), 0);
    return acc + subTotal;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50 py-10 rounded-2xl">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between items-center mb-10 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="bg-sky-500 p-4 rounded-2xl text-white shadow-lg shadow-sky-100">
              <FaUserGear size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 uppercase">
                {user.username} <span className="text-sky-500">Dashboard</span>
              </h1>
              <p className="text-slate-400 font-medium text-sm mt-1">ID: #{user.id} | email: {user.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/admin/add-car')}
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md uppercase"
            ><FaPlus /> new car
            </button>
            <button
              onClick={handleLogout}
              className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold hover:bg-sky-50 hover:text-sky-600 transition-all cursor-pointer capitalize"
            >
              <FaRightFromBracket /> logout
            </button>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-slate-200 shadow-sm shadow-slate-200 mb-10">
          <div className="bg-white rounded-2xl flex items-center divide-x divide-slate-100 overflow-hidden">

            <div className="flex-1 px-8 py-6 flex items-center gap-5 hover:bg-slate-50 transition-all group">
              <div className="bg-sky-100 text-sky-600 p-3 rounded-2xl group-hover:scale-110 transition-all">
                <FaCar size={24} />
              </div>
              <div>
              <p className="text-xs font-black uppercase text-slate-400">total cars</p>
                <p className="text-2xl font-black text-slate-900">{cars.length}</p>
              </div>
            </div>

            <div className="flex-1 px-8 py-6 flex items-center gap-5 hover:bg-slate-50 transition-all group">
              <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl group-hover:scale-110 transition-all">
                <FaCartShopping size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-slate-400">total orders</p>
                <p className="text-2xl font-black text-slate-900">{orders.length}</p>
              </div>
            </div>

            <div className="flex-1 px-8 py-6 flex items-center gap-5 hover:bg-slate-50 transition-all group">
              <div className="bg-emerald-500 text-white p-3 rounded-2xl shadow-lg shadow-emerald-200 group-hover:group-hover:scale-110 transition-all">
                <FaEuroSign size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-slate-400">total profit</p>
                <p className="text-2xl font-black text-emerald-700">
                  {totalProfit.toLocaleString()}
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-sky-50">
            <div className="flex items-center gap-3">
              <FaFileInvoice className="text-sky-500" size={30} />
              <p className="text-sm font-black text-slate-800 uppercase">Transactions</p>
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 uppercase text-xs font-black border-b border-slate-100">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Car</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map((order) => (
                order.item.map((item) => (
                  <tr key={item.id} className="hover:bg-sky-50 transition-all duration-200">
                    <td className="px-6 py-5 font-mono text-xs text-slate-400">#{order.id}</td>
                    <td className="px-6 py-5 font-bold text-slate-700 decoration-slate-200 capitalize">
                      {findUsers.find(user => String(user.id) === String(order.userId))?.username}
                    </td>
                    <td className="px-6 py-5">
                      <Link to={`/cars/${item.id}`} className="text-slate-600 hover:text-sky-600 font-medium capitalize">
                        {item.brand} <span className="font-bold text-slate-900 capitalize">{item.model}</span>
                      </Link>
                    </td>
                    <td className="pl-13 py-5 font-bold text-slate-500">{item.quantity}</td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-slate-900 font-black text-lg italic">
                        €{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/cars")}
            className="flex items-center gap-2 font-medium text-slate-500 hover:text-sky-600 transition-all cursor-pointer uppercase text-xs"
          ><FaArrowLeft />back to catalog</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;