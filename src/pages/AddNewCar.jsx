import React from 'react'
import NewCarForm from '../components/NewCarForm'
import { useNavigate } from 'react-router'
import { FaArrowLeft } from 'react-icons/fa6'

const AddNewCar = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="w-full mx-auto py-10">
                <NewCarForm />
            </div>
            <div className="mt-2 pb-10 flex justify-center">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 font-medium text-slate-500 hover:text-sky-600 transition-all cursor-pointer uppercase text-xs"
          ><FaArrowLeft />back to dashboard</button>
        </div>
        </>
    )
}

export default AddNewCar