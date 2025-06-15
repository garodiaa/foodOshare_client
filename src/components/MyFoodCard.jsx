import React, { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdLocationOn, MdDateRange } from 'react-icons/md';

const MyFoodCard = ({ food, onDelete, onUpdate }) => {
    const {
        _id,
        foodName,
        foodImage,
        foodQuantity,
        pickupLocation,
        expiredDateTime,
        additionalNotes,
        donorName,
        donorEmail,
        donorImage,
        foodStatus,
    } = food;

    // console.log(food);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formState, setFormState] = useState({
        foodName,
        foodImage,
        foodQuantity,
        pickupLocation,
        expiredDateTime,
        additionalNotes,
    });
    const formRef = useRef();

    // Handle update form submit
    const handleUpdate = (e) => {
        e.preventDefault();
        onUpdate(_id, formState, () => {
            setShowUpdateModal(false);
            toast.success('Food updated successfully!');
        });
    };

    // Handle delete confirm
    const handleDelete = () => {
        onDelete(_id, () => {
            setShowDeleteModal(false);
            toast.success('Food deleted successfully!');
        });
    };

    return (
        <>
            <div className="card bg-base-100 rounded-2xl border border-base-300 mx-auto transition-transform duration-300 hover:scale-105 w-full max-w-xs mb-4">
                <figure className='h-48'>
                    <img
                        src={foodImage}
                        alt={foodName}
                        className="w-full h-full object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{foodName}</h2>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="badge badge-outline md:badge-md badge-sm">Quantity: {foodQuantity}</span>
                        <span className="badge badge-info badge-outline flex items-center gap-1 md:badge-md badge-sm">
                            <MdLocationOn /> {pickupLocation}
                        </span>
                        <span className="badge badge-error badge-outline flex items-center gap-1 md:badge-md badge-sm">
                            <MdDateRange /> {expiredDateTime.replace('T', ' ')}
                        </span>
                        <span className={`badge ${foodStatus === 'requested' ? 'badge-warning' : 'badge-success'} md:badge-md badge-sm`}>
                            {foodStatus}
                        </span>
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">Notes: </span>
                        {additionalNotes || 'None'}
                    </div>
                    <div className="flex items-center gap-2 mb-2 mt-2">
                        <img
                            src={donorImage}
                            alt={donorName}
                            className="w-8 h-8 rounded-full border"
                        />
                        <div>
                            <div className="font-semibold">{donorName}</div>
                            <div className="text-sm text-gray-500">{donorEmail}</div>
                        </div>
                    </div>
                    <div className="card-actions mt-4 items-center justify-end gap-2">
                        <button className="btn btn-outline btn-primary btn-sm" onClick={() => setShowUpdateModal(true)}>
                            Update
                        </button>
                        <button className="btn btn-outline btn-error btn-sm" onClick={() => setShowDeleteModal(true)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Update Modal */}
            {showUpdateModal && (
                <dialog open className="modal modal-open p-3 z-50">
                    <div className="modal-box max-w-xl">
                        <h3 className="font-bold text-lg mb-4">Update Food</h3>
                        <form ref={formRef} onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block font-semibold mb-1">Food Name</label>
                                <input
                                    type="text"
                                    value={formState.foodName}
                                    onChange={e => setFormState({ ...formState, foodName: e.target.value })}
                                    className="input focus-within:border-none input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Food Image URL</label>
                                <input
                                    type="url"
                                    value={formState.foodImage}
                                    onChange={e => setFormState({ ...formState, foodImage: e.target.value })}
                                    className="input focus-within:border-none input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Food Quantity</label>
                                <input
                                    type="number"
                                    value={formState.foodQuantity}
                                    onChange={e => setFormState({ ...formState, foodQuantity: e.target.value })}
                                    className="input focus-within:border-none input-bordered w-full"
                                    min="1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Pickup Location</label>
                                <input
                                    type="text"
                                    value={formState.pickupLocation}
                                    onChange={e => setFormState({ ...formState, pickupLocation: e.target.value })}
                                    className="input focus-within:border-none input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Expired Date/Time</label>
                                <input
                                    type="datetime-local"
                                    value={formState.expiredDateTime}
                                    onChange={e => setFormState({ ...formState, expiredDateTime: e.target.value })}
                                    className="input focus-within:border-none input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Additional Notes</label>
                                <textarea
                                    value={formState.additionalNotes}
                                    onChange={e => setFormState({ ...formState, additionalNotes: e.target.value })}
                                    className="textarea focus-within:border-none textarea-bordered w-full"
                                />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Update</button>
                                <button type="button" className="btn" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button aria-label="Close" onClick={() => setShowUpdateModal(false)}>close</button>
                    </form>
                    <Toaster />
                </dialog>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <dialog open className="modal modal-open p-3 z-50">
                    <div className="modal-box max-w-sm">
                        <h3 className="font-bold text-lg mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete <span className="font-semibold">{foodName}</span>?</p>
                        <div className="modal-action">
                            <button className="btn btn-error" onClick={handleDelete}>Yes, Delete</button>
                            <button className="btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button aria-label="Close" onClick={() => setShowDeleteModal(false)}>close</button>
                    </form>
                    <Toaster />
                </dialog>
            )}
        </>
    );
};

export default MyFoodCard;