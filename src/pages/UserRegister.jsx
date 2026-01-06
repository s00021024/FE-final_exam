import { Link } from 'react-router';
import UserRegisterForm from '../components/UserRegisterForm';

const UserRegister = () => {

    return (
        <div className='w-full flex justify-center items-center my-10'>
            <div className="bg-slate-50 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-800">New user account</h2>
                </div>
                <UserRegisterForm />
                <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-sky-600 font-bold hover:underline">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;