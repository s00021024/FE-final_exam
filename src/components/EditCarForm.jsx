import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, updateCar, deleteCar } from '../redux/car/carActions';
import { toast } from 'react-toastify';
import { FaPenToSquare, FaArrowLeft, FaCarRear, FaFloppyDisk, FaTrash } from 'react-icons/fa6';
const EditCarForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const car = useSelector(state => state.cars.list.find(c => String(c.id) === String(id)))
    const [formData, setFormData] = useState({...car});

    useEffect(() => {
        if (!car) {
            dispatch(fetchCars());
        }
    }, [car, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            year: Number(formData.year),
            price: Number(formData.price),
            mileage_km: Number(formData.mileage_km)
        };
        try {
            const response = await dispatch(updateCar(id, updatedFormData));
            if (response.success) {
                toast.success(`${car.brand} ${car.model} updated successfully!`)
                navigate('/cars/' + id);
            } else {
                toast.error(response.message, "error connecting to database")
            }
        } catch (error) {
            toast.error(error.message)
        }

    }
    const handleDeleteCar = async (id, brand, model) => {
        if (window.confirm(`Are you sure you want to delete ${brand} ${model}?`)) {
            try {
                const response = await dispatch(deleteCar(id))
                if (response.success) {
                    toast.info(`${brand} ${model} deleted from catalog`)
                    navigate('/admin')
                } else {
                    toast.error(response.message, "error connecting to database")
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }
    const isFormInvalid = !formData.brand || !formData.model || !formData.year || !formData.mileage_km || !formData.price

    return (
        <div className='pb-10'>
            <div className="my-4 flex justify-between items-center gap-5">
                <button
                    onClick={() => navigate('/cars/' + id)}
                    className="flex items-center gap-2 font-medium text-slate-500 hover:text-sky-600 transition-all cursor-pointer uppercase text-xs"
                ><FaArrowLeft />back to catalog</button>
                <button
                    onClick={() => car && handleDeleteCar(car.id, car.brand, car.model)}
                    className="w-40 flex items-center justify-center gap-2 bg-red-600 text-white font-bold uppercase py-4 rounded-2xl hover:bg-red-700 shadow-lg shadow-sky-200 active:scale-95 transition-all cursor-pointer"
                ><FaTrash /> delete car
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

                <div className="bg-sky-500 p-8 text-white flex justify-between items-center border-b-8 border-sky-600">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <FaPenToSquare className="text-sky-100" />
                            <span className="text-sm font-black uppercase text-sky-100 opacity-80">Edit car</span>
                        </div>
                        <h1 className="text-3xl font-black uppercase italic">
                            {formData.brand || "Car"} <span className="font-light">{formData.model || "Model"}</span>
                        </h1>
                    </div>
                    <FaCarRear size={40} className="text-white" />
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                    <div className="grid grid-cols-2 gap-8">

                        <div>
                            <label htmlFor='brand' className={"block text-sm font-black uppercase text-slate-400 mb-2"}>brand</label>
                            <input
                                id='brand'
                                type="text"
                                value={formData.brand || ""}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                className={"w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-sky-500 focus:bg-white outline-none font-bold text-slate-700 transition-all placeholder:text-slate-200"}
                                required
                            />
                            {!formData.brand && (<span className='text-red-500 text-xs'>please fill out this field</span>)}
                        </div>

                        <div>
                            <label htmlFor='model' className={"block text-sm font-black uppercase text-slate-400 mb-2"}>Model</label>
                            <input
                                id='model'
                                type="text"
                                value={formData.model || ""}
                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                className={"w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-sky-500 focus:bg-white outline-none font-bold text-slate-700 transition-all placeholder:text-slate-200"}
                                required
                            />
                            {!formData.model && (<span className='text-red-500 text-xs'>please fill out this field</span>)}
                        </div>

                        <div>
                            <label htmlFor='year' className={"block text-sm font-black uppercase text-slate-400 mb-2"}>year</label>
                            <input
                                id='year'
                                type="number"
                                value={formData.year || ""}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className={"w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-sky-500 focus:bg-white outline-none font-bold text-slate-700 transition-all placeholder:text-slate-200"}
                                required
                            />
                            {!formData.year && (<span className='text-red-500 text-xs'>please fill out this field</span>)}
                        </div>

                        <div>
                            <label htmlFor='price' className={"block text-sm font-black uppercase text-slate-400 mb-2"}>price</label>
                            <input
                                id='price'
                                type="number"
                                value={formData.price || ""}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className={"w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-sky-500 focus:bg-white outline-none font-bold text-slate-700 transition-all placeholder:text-slate-200"}
                                required
                            />
                            {!formData.price && (<span className='text-red-500 text-xs'>please fill out this field</span>)}
                        </div>

                        <div>
                            <label htmlFor='mileage' className={"block text-sm font-black uppercase text-slate-400 mb-2"}>mileage</label>
                            <input
                                id='mileage'
                                type="number"
                                value={formData.mileage_km || ""}
                                onChange={(e) => setFormData({ ...formData, mileage_km: e.target.value })}
                                className={"w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-sky-500 focus:bg-white outline-none font-bold text-slate-700 transition-all placeholder:text-slate-200"}
                                required
                            />
                            {!formData.mileage_km && (<span className='text-red-500 text-xs'>please fill out this field</span>)}
                        </div>

                        <div>
                            <label htmlFor='transmission' className={"block text-sm font-black uppercase text-slate-400 mb-2"}>transmission</label>
                            <select id='transmission'
                                className={"w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-sky-500 focus:bg-white outline-none font-bold text-slate-700 transition-all placeholder:text-slate-200" + " appearance-none cursor-pointer"}
                                value={formData.transmission || ""}
                                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                            >
                                <option value="manual">manual</option>
                                <option value="automatic">automatic</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor='fuel' className={"block text-sm font-black uppercase text-slate-400 mb-2"}>fuel type</label>
                            <select
                                id='fuel'
                                className={"w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-sky-500 focus:bg-white outline-none font-bold text-slate-700 transition-all placeholder:text-slate-200" + " appearance-none cursor-pointer"}
                                value={formData.fuel_type || ""}
                                onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                            >
                                <option value="petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>

                        <div className='flex justify-center items-center gap-2'>
                            <input id='car_available'
                                type="checkbox" name="is_available" checked={!!formData.is_available} onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                                className="w-6 h-6 accent-sky-500 cursor-pointer"
                            />
                            <label htmlFor='car_available' className="text-sm font-black uppercase text-slate-700 cursor-pointer select-none">
                                car available
                            </label>
                        </div>

                        <div className="col-span-2 space-y-4 pt-4">
                            <div>
                                <label htmlFor='image' className={"text-sm font-black uppercase text-slate-400 mb-2"}>URL image</label>
                                <input
                                    id='image'
                                    type="text"
                                    value={formData.image_url || ""}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    className={"w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-sky-500 focus:bg-white outline-none font-bold text-slate-700 transition-all placeholder:text-slate-200"}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="flex justify-center bg-white p-6 rounded-2xl border-2 border-dashed border-slate-200">
                                {formData.image_url ? (
                                    <img src={formData.image_url} alt="Preview" className="h-40 object-contain rounded-lg shadow-md" />
                                ) : (
                                    <img src='https://placehold.co/400x200?text=no image available' />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isFormInvalid}
                            className={isFormInvalid ? "w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-300 font-bold uppercase py-4 rounded-2xl shadow-lg transition-all opacity-25 pointer-events-none" : "w-full flex items-center justify-center gap-2 bg-sky-500 text-white font-bold uppercase py-4 rounded-2xl hover:bg-sky-600 shadow-lg shadow-sky-200 active:scale-95 transition-all cursor-pointer"}
                        ><FaFloppyDisk />Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCarForm;