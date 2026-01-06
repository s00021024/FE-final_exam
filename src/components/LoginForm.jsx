import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../redux/users/usersActions';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(null)

  const lastCarId = localStorage.getItem('lastViewedCar')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEmailValid = email.includes('@')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);

    if (!email || !password) {
      setLoginError('Please insert email e password')
      toast.warning(loginError)
      return
    }

    try {
      const currentUser = await dispatch(login(email, password));
      if (currentUser) {
        toast.success(`welcome ${currentUser.username}`)
        const targetPath = currentUser.role === 'admin' ? '/admin' : lastCarId ? `/cars/${lastCarId}` : "/cars"
        navigate(targetPath, { replace: true })
      }
    } catch (e) {
      setLoginError(e.message)
      toast.error(e.message)

    }
  };

  return (

    <div>
      {loginError && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{loginError}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor='email' className="block text-sm font-medium text-gray-700">email</label>
          <input id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black" />
          {email && !isEmailValid && (<span className='text-red-500 text-xs'>the email must contain the @ symbol</span>)}
        </div>
        <div>
          <label htmlFor='password' className="block text-sm font-medium text-gray-700">password</label>
          <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black" />
        </div>
        <button type="submit" className="w-full bg-sky-600 font-bold py-3 rounded-xl shadow-lg transition-all  active:scale-95">
          Login
        </button>
      </form>

    </div>
  );
};
export default LoginForm;