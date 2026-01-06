import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCar } from '../redux/car/carActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { FaCarSide, FaImage, FaFloppyDisk } from 'react-icons/fa6';

const NewCarForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [carData, setCarData] = useState({
        brand: "",
        model: "",
        year: 0,
        mileage_km: 0,
        price: 0,
        is_available: true,
        transmission: "",
        fuel_type: "",
        image_url: "https://placehold.co/400x200?text=no+image"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCarData = {
            ...carData,
            year: Number(carData.year),
            price: Number(carData.price),
            mileage_km: Number(carData.mileage_km)
        };
        try {
            const response = await dispatch(addCar(newCarData))
            if (response.success) {
                toast.success(`${carData.brand} ${carData.model} added to catalog!`)
                navigate(-1)
            } else {
                toast.error(response.message, "error connecting to database")
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    const isFormInvalid = !carData.brand || !carData.model || !carData.year || !carData.mileage_km || !carData.price || !carData.transmission || !carData.fuel_type


    return (
        <div>
            <div className="w-full mx-auto">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

                    <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black uppercase">New <span className="text-sky-400">Car</span></h1>
                            <p className="text-slate-400 text-xs font-bold mt-1">EPICar <span className='uppercase'>database</span></p>
                        </div>
                        <FaCarSide size={40} className="text-sky-400" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor='brand' className="block text-sm font-semibold text-gray-600 mb-1">brand</label>
                                    <input
                                        id='brand'
                                        type='text'
                                        placeholder=""
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black"
                                        value={carData.brand} onChange={(e) => setCarData({ ...carData, brand: e.target.value })} required />
                                    {!carData.brand && (<span className='text-red-500 text-xs'>required field</span>)}
                                </div>
                                <div>
                                    <label htmlFor='model' className="block text-sm font-semibold text-gray-600 mb-1">model</label>
                                    <input
                                        id='model'
                                        type='text'
                                        placeholder=""
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black"
                                        value={carData.model} onChange={(e) => setCarData({ ...carData, model: e.target.value })} required />
                                    {!carData.model && (<span className='text-red-500 text-xs'>required field</span>)}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor='year' className="block text-sm font-semibold text-gray-600 mb-1">year</label>
                                        <input
                                            id='year'
                                            type="number"
                                            placeholder=""
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black"
                                            value={carData.year || ""} onChange={(e) => setCarData({ ...carData, year: e.target.value })} required />
                                        {!carData.year && (<span className='text-red-500 text-xs'>required field</span>)}
                                    </div>
                                    <div>
                                        <label htmlFor='price' className="block text-sm font-semibold text-gray-600 mb-1">price</label>
                                        <input
                                            id='price'
                                            type="number"
                                            placeholder=""
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black"
                                            value={carData.price || ""} onChange={(e) => setCarData({ ...carData, price: e.target.value })} required />
                                        {!carData.price && (<span className='text-red-500 text-xs'>required field</span>)}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor='mileage' className="block text-sm font-semibold text-gray-600 mb-1">mileage</label>
                                    <input
                                        id='mileage'
                                        type="number"
                                        placeholder=""
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black"
                                        value={carData.mileage_km || ""} onChange={(e) => setCarData({ ...carData, mileage_km: e.target.value })} required />
                                    {!carData.mileage_km && (<span className='text-red-500 text-xs'>required field</span>)}
                                </div>

                                <div>
                                    <label htmlFor='transmission' className="block text-sm font-semibold text-gray-600 mb-1">transmission</label>
                                    <select required
                                        id='transmission'
                                        name="transmission"
                                        value={carData.transmission}
                                        onChange={(e) => setCarData({ ...carData, transmission: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black"
                                    >
                                        <option value="">Select</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Automatic">Automatic</option>
                                    </select>
                                    {!carData.transmission && (<span className='text-red-500 text-xs'>required field</span>)}
                                </div>

                                <div>
                                    <label htmlFor='fuel' className="block text-sm font-semibold text-gray-600 mb-1">fuel type</label>
                                    <select required
                                        id='fuel'
                                        name="fuel_type"
                                        value={carData.fuel_type}
                                        onChange={(e) => setCarData({ ...carData, fuel_type: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-black"
                                    >
                                        <option value="">Select</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                    {!carData.fuel_type && (<span className='text-red-500 text-xs'>required field</span>)}
                                </div>
                            </div>

                            <div className="col-span-2 mt-4 p-6 bg-sky-50 rounded-2xl border border-sky-100">
                                <label htmlFor='image' className="text-sm font-black uppercase text-sky-600 mb-2 flex items-center gap-2">
                                    <FaImage /> URL image
                                </label>
                                <input
                                    id='image'
                                    type="text"
                                    className="w-full p-3 bg-white border border-sky-200 rounded-xl outline-none focus:border-sky-500 font-medium text-slate-600"
                                    placeholder="https://..."
                                    value={carData.image_url}
                                    onChange={(e) => setCarData({ ...carData, image_url: e.target.value })}
                                />
                                {carData.image_url && (
                                    <img src={carData.image_url} className="mt-4 h-32 w-full object-contain rounded-xl bg-white border-2 border-white shadow-sm" alt="Preview" />
                                )}
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                disabled={isFormInvalid}
                                type="submit"
                                className={isFormInvalid ? "w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-300 font-bold uppercase py-4 rounded-2xl shadow-lg transition-all opacity-25 pointer-events-none" : "w-full flex items-center justify-center gap-2 bg-sky-500 text-white font-bold uppercase py-4 rounded-2xl hover:bg-sky-600 shadow-lg shadow-sky-200 active:scale-95 transition-all cursor-pointer"}
                            ><FaFloppyDisk /> save car</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewCarForm;