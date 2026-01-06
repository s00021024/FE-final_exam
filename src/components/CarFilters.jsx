import React from 'react';
import { useSearchParams } from 'react-router';
import { FaArrowRotateLeft } from 'react-icons/fa6';

const CarFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = {
        brand: searchParams.get("brand") || "",
        model: searchParams.get("model") || "",
        year: searchParams.get("year") || "",
        price: searchParams.get("price") || "",
        limit: searchParams.get("limit") || "6"
    };

    const updateFilters = (newParams) => {
        setSearchParams({
            ...Object.fromEntries(searchParams),
            ...newParams,
            page: "1"
        });
    };

    const handleReset = () => setSearchParams({});

    return (
        <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
            <div className="grid grid-cols-6 gap-4 items-end">

                <div>
                    <label htmlFor='brand' className="block text-xs font-bold uppercase text-slate-400 mb-1 ml-1">Brand</label>
                    <input
                        id='brand'
                        type="text" placeholder="" className={"w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-slate-600 text-sm font-bold"}
                        value={filters.brand} onChange={(e) => updateFilters({ brand: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="model" className="block text-xs font-bold uppercase text-slate-400 mb-1 ml-1">Model</label>
                    <input
                        id='model'
                        type="text" placeholder="" className={"w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-slate-600 text-sm font-bold"}
                        value={filters.model} onChange={(e) => updateFilters({ model: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor='year' className="block text-xs font-bold uppercase text-slate-400 mb-1 ml-1">Year</label>
                    <input
                        id='year'
                        type="number" placeholder="" className={"w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-slate-600 text-sm font-bold"}
                        value={filters.year} onChange={(e) => updateFilters({ year: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor='price' className="block text-xs font-bold uppercase text-slate-400 mb-1 ml-1">Price (€)</label>
                    <input
                        id='price'
                        type="number" placeholder="" className={"w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-slate-600 text-sm font-bold"}
                        value={filters.price} onChange={(e) => updateFilters({ price: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor='show' className="block text-xs font-bold uppercase text-slate-400 mb-1 ml-1">Show</label>
                    <select
                        id='show'
                        className={"w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-slate-600 text-sm font-bold"}
                        value={filters.limit} onChange={(e) => updateFilters({ limit: e.target.value })}
                    >
                        <option value="6">6 Cars</option>
                        <option value="12">12 Cars</option>
                        <option value="24">24 Cars</option>
                        <option value="30">30 Cars</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleReset}
                        className="flex-1 bg-slate-200 text-slate-600 p-2.5 rounded-xl hover:bg-slate-300 transition-all cursor-pointer flex justify-center items-center"
                        title="Reset"
                    >
                        <FaArrowRotateLeft />
                    </button>

                </div>

            </div>
        </div>
    );
};

export default CarFilters;