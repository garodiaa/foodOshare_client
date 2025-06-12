import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
// React Icons
import { MdLocationOn, MdDateRange } from 'react-icons/md';
import { FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const FoodDetails = () => {
    const food = useLoaderData().data;
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [requestNotes, setRequestNotes] = useState('');

    const handleRequest = async (e) => {
        e.preventDefault();
        try {
            await axiosSecure.patch(`/foods/${food._id}`, {
                Status: 'requested',
                requestNotes,
                requestedBy: user?.email,
                requestDate: new Date().toISOString(),
            });
            toast.success('Request sent successfully!');
            setShowModal(false);
        } catch (err) {
            toast.error('Failed to send request');
        }
    };

    if (!food) {
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-10 px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-8 bg-base-100 rounded-2xl border border-base-300 shadow-lg overflow-hidden">
                {/* Food Image */}
                <figure className="h-64 md:h-auto">
                    <img
                        src={food.foodImage}
                        alt={food.foodName}
                        className="w-full h-full object-cover"
                    />
                </figure>
                {/* Food Details */}
                <div className="card-body flex flex-col justify-between">
                    <div>
                        <h2 className="card-title text-3xl my-3">{food.foodName}</h2>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <span className="badge badge-outline">
                                Quantity: {food.foodQuantity}
                            </span>
                            <span className={`badge flex items-center gap-1 ${food.foodStatus === 'requested' ? 'badge-warning' : 'badge-success'}`}>
                                {food.foodStatus === 'requested' ? (
                                    <>
                                        <FaHourglassHalf /> Requested
                                    </>
                                ) : (
                                    <>
                                        <FaCheckCircle /> Available
                                    </>
                                )}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <span className="badge badge-info badge-outline flex items-center gap-1">
                                <MdLocationOn /> Pickup: {food.pickupLocation}
                            </span>
                            <span className="badge badge-error badge-outline flex items-center gap-1">
                                <MdDateRange /> Expires: {food.expiredDateTime}
                            </span>
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Notes</label>
                            <div className="p-4 rounded bg-base-200 min-h-[60px]">
                                {food.additionalNotes || 'None'}
                            </div>
                        </div>
                        <h3 className='font-semibold mt-4'>Donor</h3>
                        <div className="flex items-center gap-4 bg-base-200 p-3 rounded-lg mt-1">
                            <img
                                src={food.donorImage}
                                alt="Donor"
                                className="w-12 h-12 rounded-full object-cover border"
                            />
                            <div>
                                <div className="font-semibold">{food.donorName}</div>
                                <div className="text-sm text-gray-500">{food.donorEmail}</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-actions items-center justify-between mt-6">
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowModal(true)}
                            disabled={food.foodStatus === 'requested'}
                        >
                            Request
                        </button>
                    </div>
                </div>
            </div>
            {/* Modal (inline, not using Modal.jsx) */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <form
                        onSubmit={handleRequest}
                        className="bg-base-100 p-6 rounded-xl border border-base-300 w-full max-w-lg mx-auto mt-10 relative"
                    >
                        <h3 className="text-xl font-bold mb-4">Request Food</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="font-semibold">Food Name</label>
                                <input
                                    type="text"
                                    value={food.foodName}
                                    readOnly
                                    className="input input-bordered w-full bg-base-200"
                                />
                            </div>
                            <div>
                                <label className="font-semibold">Food Image</label>
                                <img
                                    src={food.foodImage}
                                    alt={food.foodName}
                                    className="w-24 h-24 object-cover rounded border"
                                />
                            </div>
                            <div>
                                <label className="font-semibold">Food ID</label>
                                <input
                                    type="text"
                                    value={food._id}
                                    readOnly
                                    className="input input-bordered w-full bg-base-200"
                                />
                            </div>
                            <div>
                                <label className="font-semibold">Donator Email</label>
                                <input
                                    type="text"
                                    value={food.donorEmail}
                                    readOnly
                                    className="input input-bordered w-full bg-base-200"
                                />
                            </div>
                            <div>
                                <label className="font-semibold">Donator Name</label>
                                <input
                                    type="text"
                                    value={food.donorName}
                                    readOnly
                                    className="input input-bordered w-full bg-base-200"
                                />
                            </div>
                            <div>
                                <label className="font-semibold">Your Email</label>
                                <input
                                    type="text"
                                    value={user?.email}
                                    readOnly
                                    className="input input-bordered w-full bg-base-200"
                                />
                            </div>
                            <div>
                                <label className="font-semibold">Request Date</label>
                                <input
                                    type="text"
                                    value={new Date().toLocaleString()}
                                    readOnly
                                    className="input input-bordered w-full bg-base-200"
                                />
                            </div>
                            <div>
                                <label className="font-semibold">Pickup Location</label>
                                <input
                                    type="text"
                                    value={food.pickupLocation}
                                    readOnly
                                    className="input input-bordered w-full bg-base-200"
                                />
                            </div>
                            <div>
                                <label className="font-semibold">Expire Date</label>
                                <input
                                    type="text"
                                    value={food.expiredDateTime}
                                    readOnly
                                    className="input input-bordered w-full bg-base-200"
                                />
                            </div>
                            <div>
                                <label className="font-semibold">Additional Notes</label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Add your notes"
                                    value={requestNotes}
                                    onChange={e => setRequestNotes(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Request
                            </button>
                        </div>
                        {/* Close button (optional) */}
                        <button
                            type="button"
                            className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        >✕</button>
                    </form>
                </div>
            )}
            <Toaster />
        </div>
    );
};

export default FoodDetails;