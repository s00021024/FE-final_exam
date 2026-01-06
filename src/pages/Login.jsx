import LoginForm from '../components/LoginForm'


const Login = () => {

  return (
    <div className='w-full flex justify-center items-center my-10'>
      <div className="bg-slate-50 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-800 pb-4">User login</h2>
        <LoginForm />
      </div>
    </div>
  )
}
export default Login;