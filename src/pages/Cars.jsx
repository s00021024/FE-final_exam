import { useDispatch, useSelector } from 'react-redux'
import { fetchCars } from '../redux/car/carActions'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router'
import { Slab } from 'react-loading-indicators'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'
import CarFilters from '../components/CarFilters'

const Cars = () => {
    const dispatch = useDispatch()
    const { list: cars, isLoading } = useSelector((state) => state.cars)
    const [searchParams, setSearchParams] = useSearchParams();
    const brand = searchParams.get("brand") || "";
    const model = searchParams.get("model") || "";
    const year = searchParams.get("year") || "";
    const price = searchParams.get("price") || "";
    const limit = parseInt(searchParams.get("limit")) || 6;
    const currentPage = parseInt(searchParams.get("page")) || 1;

    let filteredCars = cars.filter(car => {
        const matchBrand = car.brand.toLowerCase().includes(brand.toLowerCase());
        const matchModel = car.model.toLowerCase().includes(model.toLowerCase());
        const matchYear = year ? car.year <= parseInt(year) : true;
        const matchPrice = price ? car.price <= parseInt(price) : true;

        return matchBrand && matchModel && matchYear && matchPrice;
    })

    const totalPages = Math.ceil(filteredCars.length / limit);
    const firstPage = (currentPage - 1) * limit;
    const carsVisibleOnPage = filteredCars.slice(firstPage, firstPage + limit);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setSearchParams({ ...Object.fromEntries(searchParams), page });
        }
    };

    useEffect(() => {
        if (cars.length === 0) dispatch(fetchCars())
    }, [dispatch, cars.length])

    return (
        <div className="w-full mx-auto py-10">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <Slab color="#0096C0" size="large" text="loading..." />
                </div>
            ) : (
                <div>
                    <CarFilters />
                    <div className="flex items-center justify-between mb-10 gap-4">
                        <h1 className="text-4xl font-black text-slate-800">
                            {filteredCars.length} cars <span className="text-sky-600">found</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        {carsVisibleOnPage.map((car) => (
                            <div key={car.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                                <div className="relative h-48 overflow-hidden bg-slate-100">
                                    <Link to={`/cars/${car.id}`}>
                                        <img
                                            src={car.image_url}
                                            alt={car.model}
                                            className="w-full h-full object-contain p-4 hover:scale-105 transition-all duration-500"
                                        />
                                    </Link>
                                    <div className="absolute top-4 left-4 bg-white backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                        {car.year}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <p className="text-sm uppercase text-sky-600 font-bold mb-1">{car.brand}</p>
                                    <p className="text-2xl text-slate-800 font-bold mb-4 capitalize">{car.model}</p>

                                    <Link
                                        to={`/cars/${car.id}`}
                                        className="flex justify-center items-center w-full py-3 px-4 bg-sky-600 text-slate-50 hover:bg-sky-800 font-bold rounded-xl transition-colors duration-300 hover:scale-101 active:scale-95"
                                    >details</Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCars.length > limit ? (
                        <div className="mt-12 flex justify-center items-center gap-6">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="rounded-2xl disabled:invisible hover:scale-110 transition-all active:scale-90 text-4xl text-slate-600"><FaCircleChevronLeft /></button>

                            <div className="text-slate-600 font-bold">
                                {currentPage} / {totalPages}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="rounded-2xl disabled:invisible hover:scale-110 transition-all active:scale-90 text-4xl text-slate-600"><FaCircleChevronRight /></button>
                        </div>
                    ) : ""}
                </div>
            )}
        </div>
    )
}

export default Cars
