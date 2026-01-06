import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router'
import { logout } from '../redux/users/usersActions'
import { FaArrowRightFromBracket, FaArrowRightToBracket, FaCarSide, FaCircleUser } from 'react-icons/fa6'



const Navbar = () => {
  const user = useSelector(state => state.users.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }
  const active = "text-sky-600 text-md font-bold uppercase";
  const inactive = "text-slate-600 text-md font-bold uppercase hover:text-sky-600 transition-all duration-300";

  return (
    <>
      <nav className="w-full z-20 rounded-2xl bg-slate-50/80 shadow backdrop-blur-md">
        <div className="max-w-7xl flex justify-between items-center p-4">
          <NavLink to={"/"} className={"text-slate-900 hover:text-sky-600 transition-all duration-300 flex-1"}><FaCarSide size={40} /></NavLink>
          
          <div className="items-center justify-center flex w-auto flex-1">
            <ul className="flex gap-3 justify-center items-center">
              <li>
                <NavLink to={"/"} className={({ isActive }) => `${isActive ? active : inactive}`}>home</NavLink>
              </li>
              <li>
                <NavLink to={"/cars"} className={({ isActive }) => `${isActive ? active : inactive}`}>catalog</NavLink>
              </li>
              {user.role === "client" && <NavLink to={"/cart"} className={({ isActive }) => `${isActive ? active : inactive}`}><li>cart</li></NavLink>}
              {!user ? <NavLink to={"/register"} className={({ isActive }) => `${isActive ? active : inactive}`}><li>register</li></NavLink> : user.role === "admin" ? <NavLink to={"/admin"} className={({ isActive }) => `${isActive ? active : inactive}`}><li>dashboard</li></NavLink> : <NavLink to={"/client"} className={({ isActive }) => `${isActive ? active : inactive}`}><li>dashboard</li></NavLink>}
            </ul>
          </div>

          <div className="flex flex-1 justify-end">
            {user ? <div className='w-fit flex justify-evenly items-center gap-2'><span className='flex gap-2 items-center capitalize text-neutral-500 font-extrabold text-xl'><FaCircleUser />{user.username} </span><button onClick={handleLogout} className='flex gap-2 items-center bg-slate-600 px-5 py-2 text-white text-xs border  hover:bg-slate-50 hover:text-slate-600 hover:border-slate-600 transition-all duration-300 rounded-2xl cursor-pointer active:scale-95 uppercase'>logout<FaArrowRightFromBracket /></button></div> : <NavLink to={"/login"} className='flex gap-2 items-center bg-white px-5 py-2 text-slate-600 border border-slate-300 text-xs hover:bg-slate-400 hover:text-slate-50 transition-all duration-300 rounded-2xl active:scale-95 uppercase'>login<FaArrowRightToBracket /></NavLink>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar