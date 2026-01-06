import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Cars from './pages/Cars'
import NotFound from './pages/NotFound'
import CarDetails from './pages/CarDetails'
import { Provider } from 'react-redux'
import store from './redux/store'
import Login from './pages/Login'
import Client from './pages/Client'
import Admin from './pages/Admin'
import Cart from './pages/Cart'
import AddNewCar from './pages/AddNewCar'
import EditCar from './pages/EditCar'
import UserRegister from './pages/UserRegister'
import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    <Provider store={store}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cars' element={<Cars />}></Route>
          <Route path='/cars/:id' element={<CarDetails />}></Route>
          <Route path='/register' element={<UserRegister />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Route>
          <Route path='/client' element={<Client />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/admin/add-car' element={<AddNewCar />}></Route>
          <Route path='/admin/edit-car/:id' element={<EditCar />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Provider>
    </>
  )
}

export default App
