import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/users/usersActions';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const UserRegisterForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const checkpassword = formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword
    const isEmailValid = formData.email.includes('@')
    const isFormInvalid = !formData.username || !isEmailValid || !formData.password || !formData.confirmPassword || checkpassword

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(registerUser(formData))
            if (response.success) {
                toast.success(`${formData.username} registered successfully!`)
                navigate("/login")
            } else {
                toast.error(response.message, "error connecting to database")
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-5">
            <div>
                <label htmlFor='name' className="block text-sm font-semibold text-gray-600 mb-1">name</label>
                <input
                    id='name'
                    type="text" name="username" required
                    value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black"
                    placeholder=""
                />
            </div>

            <div>
                <label htmlFor='email' className="block text-sm font-semibold text-gray-600 mb-1">email</label>
                <input
                    id='email'
                    type="email" name="email" required
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black"
                    placeholder=""
                />
                {formData.email && !isEmailValid && (<span className='text-red-500 text-xs'>the email must contain the @ symbol</span>)}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor='password' className="block text-sm font-semibold text-gray-600 mb-1">password</label>
                    <input
                        id='password'
                        type="password" name="password" required
                        value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black"
                    />
                </div>
                <div>
                    <label htmlFor='confirm' className="block text-sm font-semibold text-gray-600 mb-1">confirm password</label>
                    <input
                        id='confirm'
                        type="password" name="confirmPassword" required
                        value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black"
                    />

                    {checkpassword && (<span className='text-red-500 text-xs'>passwords do not match</span>)}
                </div>
            </div>

            <button
                type="submit"
                disabled={isFormInvalid}
                className={isFormInvalid ? "w-full bg-sky-600 font-bold py-3 rounded-xl shadow-lg transition opacity-25 pointer-events-none" : "w-full bg-sky-600 font-bold py-3 rounded-xl shadow-lg transition  active:scale-95"}
            >register
            </button>
        </form>
    );
};

export default UserRegisterForm;