import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../redux/car/carActions';
import { Link } from 'react-router';
import { Slab } from 'react-loading-indicators';
import { FaArrowRight } from 'react-icons/fa6';

const Home = () => {
    const dispatch = useDispatch();
    const { list: cars, isLoading, error } = useSelector(state => state.cars);
    const featuredCars = useSelector((state) => state.cars.featured);

    useEffect(() => {
        if (cars.length === 0) {
            dispatch(fetchCars());
        }
    }, [dispatch, cars.length]);



    return (
        <>
            <main className="w-full mx-auto">
                {isLoading && cars.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <Slab color="#0096C0" size="large" text="loading..." textColor="" />
                    </div>
                ) : (<>
                    <div className="py-20">
                        <h1 className="text-5xl font-extrabold text-slate-900 mb-3">
                            <span className='text-sky-600'>EPIC</span>ar dealer
                        </h1>
                        <h2 className="text-xl text-slate-600 italic">D(r)ive in to React</h2>
                    </div>
                    {error ? <p className="text-red-500 text-3xl font-extrabold p-5">❌ Error loading the cars</p> : <div>
                        <h2 className="text-3xl font-semibold mb-6">don't miss out</h2>
                        <div className='grid grid-cols-3 gap-8'>
                            {featuredCars.map(car => (
                                <div key={car.id} className="relative flex flex-col justify-between gap-5 bg-slate-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <Link to={`/cars/${car.id}`}><img src={car.image_url} alt={car.model} className='w-full h-full p-5 object-contain hover:scale-105 transition-transform duration-500' /></Link>
                                    <div className="absolute top-4 left-4 bg-white backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                        {car.year}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <p className="text-2xl font-bold text-slate-800 capitalize">{car.brand} {car.model}</p>
                                        <p className="text-slate-600">{car.mileage_km.toLocaleString()} Km</p>
                                        <p className="text-3xl font-extrabold text-sky-600">€{car.price.toLocaleString()}</p>
                                        <Link to={`/cars/${car.id}`} className="py-3 mt-4 inline-block text-slate-50 font-semibold bg-slate-400 hover:bg-slate-700 transition-all">
                                            more info
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            <div className='col-span-full pb-10'>
                                <Link to="/cars" className="max-w-fit mx-auto flex items-center gap-2 bg-sky-600 px-10 py-5 text-slate-50 text-sm border border-sky-600 hover:border hover:border-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all duration-300 rounded-2xl active:scale-95 uppercase">
                                    browse the catalog < FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>}
                </>
                )}
            </main>
        </>
    );
};
export default Home;