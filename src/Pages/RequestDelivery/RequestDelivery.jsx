// src/pages/RequestDelivery.jsx
import React from 'react';
import { FaTruckLoading } from 'react-icons/fa';

const RequestDelivery = () => {
    return (
        <div className="min-h-screen bg-base-100 py-20 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-black tracking-tighter uppercase">
                        Request <span className="text-[#ff0077]">Library Pickup</span>
                    </h2>
                    <p className="opacity-60 text-sm mt-2 font-bold tracking-widest">EXTERNAL LOGISTICS PROTOCOL</p>
                </div>

                <form className="bg-base-200 border border-base-300 rounded-[2rem] p-8 md:p-12 shadow-2xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Library Info */}
                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-50">Origin Library</label>
                            <select className="select select-bordered rounded-xl bg-base-100 border-base-300">
                                <option disabled selected>Select Source Archive</option>
                                <option>Central Public Library</option>
                                <option>National Science Library</option>
                                <option>University Archive Branch</option>
                            </select>
                        </div>

                        {/* Reservation ID */}
                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-50">Reservation Token</label>
                            <input type="text" placeholder="e.g. LIB-9920-X" className="input input-bordered rounded-xl bg-base-100 border-base-300" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase tracking-widest opacity-50">Delivery Coordinates (Address)</label>
                        <textarea className="textarea textarea-bordered rounded-xl bg-base-100 border-base-300 h-24" placeholder="Full shipment destination details..."></textarea>
                    </div>

                    <button className="btn w-full border-none text-white rounded-2xl h-14 font-black uppercase tracking-widest shadow-xl shadow-pink-500/20" style={{backgroundColor: '#ff0077'}}>
                        <FaTruckLoading className="text-xl mr-2" /> Dispatch Courier
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestDelivery;